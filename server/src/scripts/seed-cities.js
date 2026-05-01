import { pool } from "../db.js";
import { seedCities } from "../data/cities.js";

for (const city of seedCities) {
  await pool.query(
    `
      INSERT INTO cities
        (slug, name, name_en, province, adcode, coord_x, coord_y, description, gear)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        name_en = VALUES(name_en),
        province = VALUES(province),
        adcode = VALUES(adcode),
        coord_x = VALUES(coord_x),
        coord_y = VALUES(coord_y),
        description = VALUES(description),
        gear = VALUES(gear)
    `,
    city
  );
}

console.log(`Seeded ${seedCities.length} cities.`);
await pool.end();
