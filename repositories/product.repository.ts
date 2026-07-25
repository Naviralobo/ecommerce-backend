import Product from "../models/product.model";
import { IProduct } from "../interfaces/product.interface";

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return Product.create(productData);
};

export const getAllProducts = async (
  filter: Record<string, any>,
  sort: Record<string, 1 | -1>,
  page: number,
  limit: number,
): Promise<IProduct[]> => {
  return Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getProductById = async (
  productId: string,
): Promise<IProduct | null> => {
  return Product.findById(productId);
};

export const updateProduct = async (
  productId: string,
  productData: IProduct,
): Promise<IProduct | null> => {
  return Product.findByIdAndUpdate(productId, productData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProduct = async (
  productId: string,
): Promise<IProduct | null> => {
  return Product.findByIdAndDelete(productId);
};

export const saveProduct = async (product: IProduct): Promise<IProduct> => {
  return product.save();
};
