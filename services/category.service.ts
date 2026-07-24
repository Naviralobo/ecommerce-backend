import { ICategory } from "../interfaces/category.interface";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../repositories/category.repository";
import { AppError } from "../utils/AppError";

export const createCategoryService = async (
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  return createCategory(categoryData);
};

export const getAllCategoriesService = async (): Promise<ICategory[]> => {
  return getAllCategories();
};

export const getCategoryByIdService = async (
  categoryId: string
): Promise<ICategory> => {
  const category = await getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export const updateCategoryService = async (
  categoryId: string,
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  const category = await updateCategory(categoryId, categoryData);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export const deleteCategoryService = async (
  categoryId: string
): Promise<void> => {
  const category = await deleteCategory(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }
};