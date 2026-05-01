import dotenv from "dotenv";

dotenv.config();

function parseOrigins() {
  const rawOrigins = process.env.APP_ORIGINS || process.env.APP_ORIGIN || "http://127.0.0.1:5500";
  return rawOrigins
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT || 8787),
  appOrigins: parseOrigins(),
  jwtSecret: process.env.JWT_SECRET || "",
  mysql: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    database: process.env.MYSQL_DATABASE || "places_i_shot",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
  },
  cos: {
    region: process.env.COS_REGION || "",
    bucket: process.env.COS_BUCKET || "",
    secretId: process.env.COS_SECRET_ID || "",
    secretKey: process.env.COS_SECRET_KEY || "",
    publicBaseUrl: process.env.COS_PUBLIC_BASE_URL || "",
  },
};

export function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }
  return config.appOrigins.includes(origin);
}

export function assertConfig() {
  const missing = [];
  if (!config.jwtSecret) missing.push("JWT_SECRET");
  if (!config.cos.region) missing.push("COS_REGION");
  if (!config.cos.bucket) missing.push("COS_BUCKET");
  if (!config.cos.secretId) missing.push("COS_SECRET_ID");
  if (!config.cos.secretKey) missing.push("COS_SECRET_KEY");
  if (!config.cos.publicBaseUrl) missing.push("COS_PUBLIC_BASE_URL");
  return missing;
}
