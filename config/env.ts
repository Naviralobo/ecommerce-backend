import dotenv from "dotenv";

dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

  MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME as string,
  MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD as string,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME as string,
  MONGO_DB_URL: process.env.MONGO_DB_URL as string,

  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  AWS_BUCKET_URL: process.env.AWS_BUCKET_URL as string,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,

  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};
