import Category from "../models/category.model";
import { ICategory } from "../interfaces/category.interface";

export const createCategory = async (
  data: Partial<ICategory>
): Promise<ICategory> => {
  return Category.create(data);
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  return Category.find();
};

export const getCategoryById = async (
  id: string
): Promise<ICategory | null> => {
  return Category.findById(id);
};

export const updateCategory = async (
  id: string,
  data: Partial<ICategory>
): Promise<ICategory | null> => {
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCategory = async (
  id: string
): Promise<ICategory | null> => {
  return Category.findByIdAndDelete(id);
};