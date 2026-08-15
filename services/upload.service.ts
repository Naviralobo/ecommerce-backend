import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

import { s3Client } from "../config/s3";
import { env } from "../config/env";

export const uploadFileService = async (
  file: Express.Multer.File,
): Promise<{ key: string; url: string }> => {
  const key = `${randomUUID()}-${file.originalname}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  const url = getPublicFileUrlService(key);

  return { key, url };
};

export const deleteFileService = async (key: string): Promise<void> => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    }),
  );
};

export const getPublicFileUrlService = (key: string): string => {
  const bucketUrl = env.AWS_BUCKET_URL?.replace(/\/$/, "") ?? "";

  if (!bucketUrl) {
    return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_BUCKET_REGION}.amazonaws.com/${encodeURIComponent(key)}`;
  }

  return `${bucketUrl}/${encodeURIComponent(key)}`;
};

export const getSignedFileUrlService = async (
  key: string,
  expiresIn = 3600,
): Promise<string> => {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    }),
    {
      expiresIn,
    },
  );

  console.log("SIGNED URL:", url);

  return url;
};
