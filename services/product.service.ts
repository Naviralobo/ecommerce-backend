import { IProduct } from "../interfaces/product.interface";
import {
  createProduct,
  getAllProducts,
} from "../repositories/product.repository";

export const createProductService = (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return createProduct(productData);
};

export const getAllProductsService = (): Promise<IProduct[]> => {
  return getAllProducts();
};
