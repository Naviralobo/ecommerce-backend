import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import logger from "../config/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    method: req.method,
    url: req.originalUrl,
  });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
