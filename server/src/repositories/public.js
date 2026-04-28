import { pool } from "../db.js";

async function getPhotoTags(photoId) {
  const [rows] = await pool.query(
    "SELECT tag FROM photo_tags WHERE photo_id = ? ORDER BY tag ASC",
    [photoId]
  );
  return rows.map((row) => row.tag);
}

async function getPublishedPhotos(cityId) {
  const [rows] = await pool.query(
    `
      SELECT
        id,
        title,
        shot_at AS shotAt,
        camera,
        location_name AS location,
        description,
        image_url AS imageUrl,
        is_cover AS isCover
      FROM photos
      WHERE city_id = ? AND is_published = 1
      ORDER BY shot_at DESC, created_at DESC
    `,
    [cityId]
  );

  return Promise.all(
    rows.map(async (photo) => ({
      ...photo,
      isCover: Boolean(photo.isCover),
      tags: await getPhotoTags(photo.id),
    }))
  );
}

export async function listPublicCities() {
  const [cities] = await pool.query(
    `
      SELECT
        id,
        slug,
        name,
        name_en AS nameEn,
        province,
        coord_x AS coordX,
        coord_y AS coordY,
        description,
        gear
      FROM cities
      ORDER BY province ASC, name ASC
    `
  );

  return Promise.all(
    cities.map(async (city) => ({
      ...city,
      coordinates: {
        x: Number(city.coordX),
        y: Number(city.coordY),
      },
      photos: await getPublishedPhotos(city.id),
    }))
  );
}
