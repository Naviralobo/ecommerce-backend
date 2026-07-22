import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
