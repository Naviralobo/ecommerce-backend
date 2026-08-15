import { IWishlist } from "../interfaces/wishlist.interface";
import {
  createWishlist,
  getWishlistByUser,
  saveWishlist,
} from "../repositories/wishlist.repository";
import { AppError } from "../utils/AppError";

export const getWishlistService = async (
  userId: string,
): Promise<IWishlist> => {
  let wishlist = await getWishlistByUser(userId);

  if (!wishlist) {
    wishlist = await createWishlist(userId);
  }

  return wishlist;
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

  return saveWishlist(wishlist);
};

export const removeProductFromWishlistService = async (
  userId: string,
  productId: string,
) => {
  const wishlist = await getWishlistService(userId);

   wishlist.products = wishlist.products.filter(
    (product: any) => product._id.toString() !== productId,
  );

  return saveWishlist(wishlist);
};
