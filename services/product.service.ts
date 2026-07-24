import { IProduct } from "../interfaces/product.interface";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../repositories/product.repository";
import { AppError } from "../utils/AppError";

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
): Promise<IProduct> => {
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

  return getAllProducts(filter, sort, page, limit);
};

export const getProductByIdService = async (
  productId: string,
): Promise<IProduct | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const updateProductService = async (
  productId: string,
  productData: IProduct,
): Promise<IProduct | null> => {
  const product = await updateProduct(productId, productData);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const deleteProductService = async (
  productId: string,
): Promise<void> => {
  const product = await deleteProduct(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
};
