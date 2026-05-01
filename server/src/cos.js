import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "./config.js";

const client = new S3Client({
  region: "auto",
  endpoint: `https://cos.${config.cos.region}.myqcloud.com`,
  credentials: {
    accessKeyId: config.cos.secretId,
    secretAccessKey: config.cos.secretKey,
  },
  forcePathStyle: false,
});

export async function uploadBufferToCos({ buffer, contentType, key }) {
  await client.send(
    new PutObjectCommand({
      Bucket: config.cos.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `${config.cos.publicBaseUrl.replace(/\/$/, "")}/${key}`;
}

function getCosKeyFromUrl(url) {
  const value = String(url || "").trim();
  if (!value) {
    return "";
  }

  const base = config.cos.publicBaseUrl.replace(/\/$/, "");
  if (value.startsWith(`${base}/`)) {
    return value.slice(base.length + 1);
  }

  try {
    const parsed = new URL(value);
    return decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  } catch (_error) {
    return "";
  }
}

export async function deleteObjectFromCosUrl(url) {
  const key = getCosKeyFromUrl(url);
  if (!key) {
    return false;
  }

  await client.send(
    new DeleteObjectCommand({
      Bucket: config.cos.bucket,
      Key: key,
    })
  );

  return true;
}
