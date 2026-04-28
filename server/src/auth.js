import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function signAdminToken(admin) {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      role: "admin",
    },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function requireAdmin(request, response, next) {
  const header = request.headers.authorization || "";
  const [, token] = header.split(" ");
  if (!token) {
    response.status(401).json({ error: "Missing admin token" });
    return;
  }

  try {
    request.admin = jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    response.status(401).json({ error: "Invalid admin token" });
  }
}
