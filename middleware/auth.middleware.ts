import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { AppError } from "../utils/AppError";

interface AuthUser {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (typeof decoded === "string") {
      throw new AppError("Invalid token", 401);
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("Access denied", 403));
    }

    next();
  };
