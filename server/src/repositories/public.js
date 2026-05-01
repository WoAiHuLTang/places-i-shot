import { pool } from "../db.js";
import { getTableColumns } from "../schema.js";

async function getPhotoTags(photoId) {
  const [rows] = await pool.query(
    "SELECT tag FROM photo_tags WHERE photo_id = ? ORDER BY tag ASC",
    [photoId]
  );
  return rows.map((row) => row.tag);
}

async function getPublishedPhotos(cityId) {
  const photoColumns = await getTableColumns("photos");
  const optionalPhotoFields = {
    districtCode: photoColumns.has("district_code") ? "district_code AS districtCode" : "NULL AS districtCode",
    districtName: photoColumns.has("district_name") ? "district_name AS districtName" : "NULL AS districtName",
    streetName: photoColumns.has("street_name") ? "street_name AS streetName" : "NULL AS streetName",
    longitude: photoColumns.has("longitude") ? "longitude" : "NULL AS longitude",
    latitude: photoColumns.has("latitude") ? "latitude" : "NULL AS latitude",
  };
  const [rows] = await pool.query(
    `
      SELECT
        id,
        title,
        shot_at AS shotAt,
        camera,
        location_name AS location,
        ${optionalPhotoFields.districtCode},
        ${optionalPhotoFields.districtName},
        ${optionalPhotoFields.streetName},
        ${optionalPhotoFields.longitude},
        ${optionalPhotoFields.latitude},
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
      longitude: photo.longitude === null ? null : Number(photo.longitude),
      latitude: photo.latitude === null ? null : Number(photo.latitude),
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
        adcode,
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
      adcode: city.adcode,
      coordinates: {
        x: Number(city.coordX),
        y: Number(city.coordY),
      },
      photos: await getPublishedPhotos(city.id),
    }))
  );
}
