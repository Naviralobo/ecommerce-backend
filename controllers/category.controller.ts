import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await createCategoryService(req.body);

    res.status(201).json(
      new ApiResponse(true, "Category created successfully", category)
    );
  }
);

export const getAllCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await getAllCategoriesService();

    res.status(200).json(
      new ApiResponse(true, "Categories fetched successfully", categories)
    );
  }
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await getCategoryByIdService(req.params.id as string);

    res.status(200).json(
      new ApiResponse(true, "Category fetched successfully", category)
    );
  }
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await updateCategoryService(req.params.id as string, req.body);

    res.status(200).json(
      new ApiResponse(true, "Category updated successfully", category)
    );
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteCategoryService(req.params.id as string);

    res.status(200).json(
      new ApiResponse(true, "Category deleted successfully", null)
    );
  }
);