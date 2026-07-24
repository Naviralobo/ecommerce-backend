import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createProductService,
  getAllProductsService,
} from "../services/product.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await createProductService(req.body);

    res
      .status(201)
      .json(new ApiResponse(true, "Product created successfully", product));
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getAllProductsService();
    res
      .status(200)
      .json(new ApiResponse(true, "Products fetched successfully", products));
  },
);
