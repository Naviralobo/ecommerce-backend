import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/product.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiResponse } from "../utils/ApiResponse";

export const createProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const product = await createProductService(req.body,req.user!.id);

    res
      .status(201)
      .json(new ApiResponse(true, "Product created successfully", product));
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getAllProductsService({
      search: req.query.search as string,
      category: req.query.category as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      sort: req.query.sort as string,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    });

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
  async (req: Request, res: Response) => {
    const product = await updateProductService(
      req.params.id as string,
      req.body,
    );
    res
      .status(200)
      .json(new ApiResponse(true, "Product updated successfully", product));
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteProductService(req.params.id as string);

    res
      .status(200)
      .json(new ApiResponse(true, "Product deleted successfully", null));
  },
);
