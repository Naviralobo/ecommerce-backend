import { IProduct } from "../interfaces/product.interface";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
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

export const getProductByIdService = async(
  productId: string,
): Promise<IProduct | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const updateProductService = async(
  productId: string,
  productData: IProduct,
): Promise<IProduct|null> => {
  const product = await updateProduct(productId, productData);
  if(!product){
    throw new AppError("Product not found",404)
  }
  return product
};

export const deleteProductService = async (
  productId: string
): Promise<void> => {
  const product = await deleteProduct(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
};