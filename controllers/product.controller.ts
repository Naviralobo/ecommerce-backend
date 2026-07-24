import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService
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

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await getProductByIdService(req.params.id as string);
    res
      .status(200)
      .json(new ApiResponse(true, "Product fetched successfully", product));
  },
);

export const updateProduct = asyncHandler(
    async(req:Request,res:Response) =>{
        const product = await updateProductService(req.params.id as string, req.body)
        res.status(200).json(new ApiResponse(true,"Product updated successfully",product))
    }
)
