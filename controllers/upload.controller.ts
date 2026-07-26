import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";
import { uploadFileService } from "../services/upload.service";

export const uploadImage = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const result = await uploadFileService(req.file);

    res
      .status(200)
      .json(new ApiResponse(true, "Image uploaded successfully", result));
  },
);
