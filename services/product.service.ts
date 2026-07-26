import { Types } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  saveProduct,
} from "../repositories/product.repository";
import { AppError } from "../utils/AppError";
import { ROLES } from "../constants/roles";
import { getSignedFileUrlService } from "./upload.service";

interface ProductQuery {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const createProductService = (
  productData: Partial<IProduct>,
  sellerId: string,
): Promise<IProduct> => {
  productData.seller = new Types.ObjectId(sellerId);
  return createProduct(productData);
};

export const getAllProductsService = async (
  query: ProductQuery,
): Promise<IProduct[]> => {
  const filter: Record<string, any> = {};

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = query.minPrice;
    }

    if (query.maxPrice) {
      filter.price.$lte = query.maxPrice;
    }
  }

  let sort: Record<string, 1 | -1> = {
    createdAt: -1,
  };

  switch (query.sort) {
    case "price_asc":
      sort = { price: 1 };
      break;

    case "price_desc":
      sort = { price: -1 };
      break;

    case "name":
      sort = { name: 1 };
      break;
  }

  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  const products = await getAllProducts(filter, sort, page, limit);

  const productsWithImages = await Promise.all(
    products.map(async (product: IProduct) => ({
      ...product.toObject(),
      images: await getSignedImageUrls(product.images),
    })),
  );

  return productsWithImages;
};

export const getProductByIdService = async (
  productId: string,
): Promise<IProduct | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const productWithImages = {
    ...product.toObject(),
    images: await getSignedImageUrls(product.images),
  };
  return productWithImages;
};

export const updateProductService = async (
  productId: string,
  productData: IProduct,
  userId: string,
  role: string,
): Promise<IProduct | null> => {
  const existingProduct = await getProductById(productId);

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  if (role !== ROLES.ADMIN && existingProduct.seller.toString() !== userId) {
    throw new AppError("You are not authorized to update this product", 403);
  }

  const product = await updateProduct(productId, productData);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const deleteProductService = async (
  productId: string,
  userId: string,
  role: string,
): Promise<void> => {
  const existingProduct = await getProductById(productId);

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  if (role !== ROLES.ADMIN && existingProduct.seller.toString() !== userId) {
    throw new AppError("You are not authorized to delete this product", 403);
  }
  const product = await deleteProduct(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
};

export const decreaseProductStockService = async (
  productId: string,
  quantity: number,
): Promise<void> => {
  const product = await getProductById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < quantity) {
    throw new AppError("Insufficient stock", 400);
  }

  product.stock -= quantity;

  await saveProduct(product);
};

export const getSignedImageUrls = async (keys: string[]): Promise<string[]> => {
  return Promise.all(keys.map(getSignedFileUrlService));
  //The above file is equivalent to keys.map(key=>getSignedFileUrlService(key))
  //The above method works as map passes each key as the first argument.
};
