import cors from "cors";
import express from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config, assertConfig, isAllowedOrigin } from "./config.js";
import { pool } from "./db.js";
import { requireAdmin, signAdminToken, verifyPassword } from "./auth.js";
import { deleteObjectFromCosUrl, uploadBufferToCos } from "./cos.js";
import { listPublicCities } from "./repositories/public.js";
import { getTableColumns } from "./schema.js";

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

function slugifyText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureCity(connection, payload) {
  const cityColumns = await getTableColumns("cities");
  const hasAdcode = cityColumns.has("adcode");
  const normalizedId = Number(payload.cityId);
  if (normalizedId) {
    const [existingById] = await connection.query(
      `SELECT id, slug, name, ${hasAdcode ? "adcode" : "'' AS adcode"} FROM cities WHERE id = ? LIMIT 1`,
      [normalizedId]
    );
    if (existingById[0]) {
      return existingById[0];
    }
  }

  const name = String(payload.cityName || "").trim();
  const province = String(payload.province || name).trim() || "中国";
  const adcode = String(payload.cityAdcode || "").trim();
  const coordX = Number(payload.cityLongitude);
  const coordY = Number(payload.cityLatitude);

  if (!name || Number.isNaN(coordX) || Number.isNaN(coordY)) {
    throw new Error("A publishable city context is required");
  }

  let existingCity = null;
  if (adcode && hasAdcode) {
    const [existingByAdcode] = await connection.query(
      "SELECT id, slug, name, adcode FROM cities WHERE adcode = ? LIMIT 1",
      [adcode]
    );
    existingCity = existingByAdcode[0] || null;
  }
  if (!existingCity) {
    const [existingByName] = await connection.query(
      `SELECT id, slug, name, ${hasAdcode ? "adcode" : "'' AS adcode"} FROM cities WHERE name = ? LIMIT 1`,
      [name]
    );
    existingCity = existingByName[0] || null;
  }
  if (existingCity) {
    const updateSegments = ["province = ?", "coord_x = ?", "coord_y = ?"];
    const updateValues = [province, coordX, coordY];
    if (hasAdcode) {
      updateSegments.splice(1, 0, "adcode = ?");
      updateValues.splice(1, 0, adcode || existingCity.adcode || "");
    }
    updateValues.push(existingCity.id);
    await connection.query(
      `
        UPDATE cities
        SET
          ${updateSegments.join(",\n          ")}
        WHERE id = ?
      `,
      updateValues
    );
    return {
      ...existingCity,
      name,
      adcode: adcode || existingCity.adcode || "",
    };
  }

  const slugBase = slugifyText(payload.cityNameEn) || (adcode ? `city-${adcode}` : `city-${randomUUID().slice(0, 8)}`);
  let slug = slugBase;
  let suffix = 2;
  while (true) {
    const [rows] = await connection.query("SELECT id FROM cities WHERE slug = ? LIMIT 1", [slug]);
    if (!rows[0]) {
      break;
    }
    slug = `${slugBase}-${suffix}`;
    suffix += 1;
  }

  const [result] = await connection.query(
    `
      INSERT INTO cities
        (${[
          "slug",
          "name",
          "name_en",
          "province",
          ...(hasAdcode ? ["adcode"] : []),
          "coord_x",
          "coord_y",
          "description",
          "gear",
        ].join(", ")})
      VALUES
        (${[
          "?",
          "?",
          "?",
          "?",
          ...(hasAdcode ? ["?"] : []),
          "?",
          "?",
          "''",
          "''",
        ].join(", ")})
    `,
    [slug, name, payload.cityNameEn || "", province, ...(hasAdcode ? [adcode] : []), coordX, coordY]
  );

  return {
    id: result.insertId,
    slug,
    name,
    adcode,
  };
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed by CORS: ${origin || "unknown"}`));
    },
    credentials: false,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", async (_request, response) => {
  const missing = assertConfig();
  response.json({
    ok: true,
    configReady: missing.length === 0,
    missing,
    allowedOrigins: config.appOrigins,
  });
});

app.get("/api/public/cities", async (_request, response, next) => {
  try {
    const cities = await listPublicCities();
    response.json({ cities });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/login", async (request, response, next) => {
  try {
    const { email, password } = request.body || {};
    if (!email || !password) {
      response.status(400).json({ error: "Email and password are required" });
      return;
    }

    const [rows] = await pool.query(
      "SELECT id, email, password_hash AS passwordHash FROM admins WHERE email = ? LIMIT 1",
      [email]
    );
    const admin = rows[0];
    if (!admin) {
      response.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      response.status(401).json({ error: "Invalid credentials" });
      return;
    }

    response.json({
      token: signAdminToken(admin),
      admin: { id: admin.id, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/cities", requireAdmin, async (_request, response, next) => {
  try {
    const cityColumns = await getTableColumns("cities");
    const [rows] = await pool.query(
      `
        SELECT
          c.id,
          c.slug,
          c.name,
          c.name_en AS nameEn,
          c.province,
          ${cityColumns.has("adcode") ? "c.adcode" : "'' AS adcode"},
          COUNT(p.id) AS photoCount
        FROM cities c
        LEFT JOIN photos p ON p.city_id = c.id AND p.is_published = 1
        GROUP BY c.id
        ORDER BY c.province ASC, c.name ASC
      `
    );
    response.json({ cities: rows });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/photos", requireAdmin, upload.array("photos", 32), async (request, response, next) => {
  const connection = await pool.getConnection();

  try {
    const photoColumns = await getTableColumns("photos");
    if (!request.files?.length) {
      response.status(400).json({ error: "At least one photo is required" });
      return;
    }

    const cityId = Number(request.body.cityId) || null;

    const title = request.body.title || "Untitled Frame";
    const shotAt = request.body.shotAt || new Date().toISOString().slice(0, 10);
    const camera = request.body.camera || "";
    const locationSource = String(request.body.locationSource || "").trim();
    const selectedPoiName = String(request.body.selectedPoiName || "").trim();
    const location = selectedPoiName || request.body.location || "";
    const districtCode = request.body.districtCode || "";
    const districtName = request.body.districtName || "";
    const streetName = request.body.streetName || "";
    const longitude = request.body.longitude ? Number(request.body.longitude) : null;
    const latitude = request.body.latitude ? Number(request.body.latitude) : null;
    const cityName = String(request.body.cityName || "").trim();
    const cityNameEn = String(request.body.cityNameEn || "").trim();
    const province = String(request.body.province || "").trim();
    const cityAdcode = String(request.body.cityAdcode || "").trim();
    const cityLongitude = request.body.cityLongitude ? Number(request.body.cityLongitude) : longitude;
    const cityLatitude = request.body.cityLatitude ? Number(request.body.cityLatitude) : latitude;
    const description = request.body.description || "";
    const tags = String(request.body.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const published = request.body.published !== "false";
    const isCover = request.body.isCover !== "false";

    if (locationSource !== "poi" || !selectedPoiName) {
      response.status(400).json({ error: "A specific POI selection is required before publishing" });
      return;
    }

    await connection.beginTransaction();

    const city = await ensureCity(connection, {
      cityId,
      cityName,
      cityNameEn,
      province,
      cityAdcode,
      cityLongitude,
      cityLatitude,
    });
    if (!city) {
      response.status(404).json({ error: "City not found" });
      return;
    }

    const insertedIds = [];

    for (const [index, file] of request.files.entries()) {
      const extension = path.extname(file.originalname || "").toLowerCase() || ".jpg";
      const photoId = randomUUID();
      const objectKey = `cities/${city.slug}/${photoId}${extension}`;
      const imageUrl = await uploadBufferToCos({
        buffer: file.buffer,
        contentType: file.mimetype,
        key: objectKey,
      });

      const insertColumns = ["id", "city_id", "title", "shot_at", "camera", "location_name"];
      const insertValues = [
        photoId,
        city.id,
        request.files.length > 1 ? `${title} ${index + 1}` : title,
        shotAt,
        camera,
        location,
      ];

      if (photoColumns.has("district_code")) {
        insertColumns.push("district_code");
        insertValues.push(districtCode);
      }
      if (photoColumns.has("district_name")) {
        insertColumns.push("district_name");
        insertValues.push(districtName);
      }
      if (photoColumns.has("street_name")) {
        insertColumns.push("street_name");
        insertValues.push(streetName);
      }
      if (photoColumns.has("longitude")) {
        insertColumns.push("longitude");
        insertValues.push(longitude);
      }
      if (photoColumns.has("latitude")) {
        insertColumns.push("latitude");
        insertValues.push(latitude);
      }

      insertColumns.push("description", "image_url", "is_cover", "is_published");
      insertValues.push(description, imageUrl, isCover && index === 0 ? 1 : 0, published ? 1 : 0);

      await connection.query(
        `
          INSERT INTO photos
            (${insertColumns.join(", ")})
          VALUES
            (${insertColumns.map(() => "?").join(", ")})
        `,
        insertValues
      );

      for (const tag of tags) {
        await connection.query(
          "INSERT INTO photo_tags (photo_id, tag) VALUES (?, ?)",
          [photoId, tag]
        );
      }

      insertedIds.push(photoId);
    }

    await connection.commit();
    response.status(201).json({
      photoIds: insertedIds,
      city: {
        id: city.id,
        slug: city.slug,
        name: city.name,
      },
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
});

app.delete("/api/admin/photos/:photoId", requireAdmin, async (request, response, next) => {
  const connection = await pool.getConnection();

  try {
    const photoId = String(request.params.photoId || "").trim();
    if (!photoId) {
      response.status(400).json({ error: "Photo id is required" });
      return;
    }

    await connection.beginTransaction();

    const [rows] = await connection.query(
      `
        SELECT
          id,
          city_id AS cityId,
          image_url AS imageUrl
        FROM photos
        WHERE id = ?
        LIMIT 1
      `,
      [photoId]
    );

    const photo = rows[0];
    if (!photo) {
      await connection.rollback();
      response.status(404).json({ error: "Photo not found" });
      return;
    }

    await connection.query("DELETE FROM photo_tags WHERE photo_id = ?", [photoId]);
    await connection.query("DELETE FROM photos WHERE id = ?", [photoId]);

    const [countRows] = await connection.query(
      "SELECT COUNT(*) AS photoCount FROM photos WHERE city_id = ? AND is_published = 1",
      [photo.cityId]
    );

    await connection.commit();

    try {
      await deleteObjectFromCosUrl(photo.imageUrl);
    } catch (cosError) {
      console.error("Failed to delete COS object", cosError);
    }

    response.json({
      ok: true,
      cityId: Number(photo.cityId),
      remainingPhotoCount: Number(countRows[0]?.photoCount || 0),
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../../")));

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: error.message || "Internal server error" });
});

export default app;
