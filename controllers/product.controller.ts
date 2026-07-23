import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { createProductService } from "../services/product.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await createProductService(req.body);

    res
      .status(201)
      .json(new ApiResponse(true, "Product created successfully", product));
  },
);
