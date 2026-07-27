import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyRefreshToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
};
