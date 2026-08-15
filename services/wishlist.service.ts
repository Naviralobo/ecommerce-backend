import { IWishlist } from "../interfaces/wishlist.interface";
import {
  createWishlist,
  getWishlistByUser,
  saveWishlist,
} from "../repositories/wishlist.repository";
import { AppError } from "../utils/AppError";
import { getPublicFileUrlService } from "./upload.service";

const toPlainObject = <T>(value: T): T => {
  if (value && typeof value === "object" && "toObject" in value) {
    return (value as any).toObject();
  }

  return value;
};

const normalizeWishlistProducts = (products: any[]) =>
  products.map((product) => {
    const plainProduct = toPlainObject(product);

    return {
      ...plainProduct,
      images: Array.isArray(plainProduct.images)
        ? plainProduct.images.map((image: string) =>
            typeof image === "string" ? getPublicFileUrlService(image) : image,
          )
        : plainProduct.images,
    };
  });

export const getWishlistService = async (
  userId: string,
): Promise<IWishlist> => {
  let wishlist = await getWishlistByUser(userId);

  if (!wishlist) {
    wishlist = await createWishlist(userId);
  }

  const plainWishlist = toPlainObject(wishlist);

  return {
    ...plainWishlist,
    products: normalizeWishlistProducts(plainWishlist.products),
  } as IWishlist;
};

export const addProductToWishlistService = async (
  userId: string,
  productId: string,
): Promise<IWishlist> => {
  const wishlist = await getWishlistService(userId);

  if (wishlist.products.includes(productId as any)) {
    throw new AppError("Product already in wishlist", 400);
  }
  wishlist.products.push(productId as any);

  const savedWishlist = await saveWishlist(wishlist as any);
  const plainWishlist = toPlainObject(savedWishlist);

  return {
    ...plainWishlist,
    products: normalizeWishlistProducts(plainWishlist.products),
  } as IWishlist;
};

export const removeProductFromWishlistService = async (
  userId: string,
  productId: string,
) => {
  const wishlist = await getWishlistService(userId);

  wishlist.products = wishlist.products.filter(
    (product: any) => product._id.toString() !== productId,
  );

  const savedWishlist = await saveWishlist(wishlist as any);
  const plainWishlist = toPlainObject(savedWishlist);

  return {
    ...plainWishlist,
    products: normalizeWishlistProducts(plainWishlist.products),
  } as IWishlist;
};
