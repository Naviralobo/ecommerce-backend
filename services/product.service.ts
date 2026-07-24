import { IProduct } from "../interfaces/product.interface";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../repositories/product.repository";
import { AppError } from "../utils/AppError";

export const createProductService = (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return createProduct(productData);
};

export const getAllProductsService = (): Promise<IProduct[]> => {
  return getAllProducts();
};

export const getProductByIdService = (
  productId: string,
): Promise<IProduct | null> => {
  const product = getProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};
