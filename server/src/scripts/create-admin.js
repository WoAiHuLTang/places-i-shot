import { hashPassword } from "../auth.js";
import { pool } from "../db.js";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: npm run create-admin -- admin@example.com your-password");
  process.exit(1);
}

const passwordHash = await hashPassword(password);
await pool.query(
  `
    INSERT INTO admins (email, password_hash)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)
  `,
  [email, passwordHash]
);

console.log(`Admin ready: ${email}`);
await pool.end();
