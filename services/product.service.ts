import { IProduct } from "../interfaces/product.interface";
import { createProduct } from "../repositories/product.repository";

export const createProductService = (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return createProduct(productData);
};
