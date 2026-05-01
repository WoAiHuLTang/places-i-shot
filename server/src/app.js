import cors from "cors";
import express from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config, assertConfig, isAllowedOrigin } from "./config.js";
import { pool } from "./db.js";
import { requireAdmin, signAdminToken, verifyPassword } from "./auth.js";
import { uploadBufferToCos } from "./cos.js";
import { listPublicCities } from "./repositories/public.js";

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

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
    const [rows] = await pool.query(
      `
        SELECT
          c.id,
          c.slug,
          c.name,
          c.name_en AS nameEn,
          c.province,
          c.adcode,
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
    if (!request.files?.length) {
      response.status(400).json({ error: "At least one photo is required" });
      return;
    }

    const cityId = Number(request.body.cityId);
    if (!cityId) {
      response.status(400).json({ error: "cityId is required" });
      return;
    }

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

    const [cities] = await connection.query(
      "SELECT id, slug FROM cities WHERE id = ? LIMIT 1",
      [cityId]
    );
    const city = cities[0];
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

      await connection.query(
        `
          INSERT INTO photos
            (id, city_id, title, shot_at, camera, location_name, district_code, district_name, street_name, longitude, latitude, description, image_url, is_cover, is_published)
          VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          photoId,
          cityId,
          request.files.length > 1 ? `${title} ${index + 1}` : title,
          shotAt,
          camera,
          location,
          districtCode,
          districtName,
          streetName,
          longitude,
          latitude,
          description,
          imageUrl,
          isCover && index === 0 ? 1 : 0,
          published ? 1 : 0,
        ]
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
    response.status(201).json({ photoIds: insertedIds });
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
