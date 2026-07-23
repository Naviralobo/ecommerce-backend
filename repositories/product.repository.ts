import Product from "../models/product.model";
import { IProduct } from "../interfaces/product.interface";

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return Product.create(productData);
};

