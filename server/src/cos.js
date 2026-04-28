import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
