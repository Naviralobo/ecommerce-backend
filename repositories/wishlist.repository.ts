import { IWishlist } from "../interfaces/wishlist.interface";
import Wishlist from "../models/wishlist.model";

export const getWishlistByUser = async (userId: string): Promise<IWishlist | null> => {
  return Wishlist.findOne({ user: userId }).populate("products");
};

export const createWishlist = async (userId: string): Promise<IWishlist> => {
  return Wishlist.create({ user: userId, products: [] });
};

export const saveWishlist = async (wishlist: IWishlist): Promise<IWishlist> => {
  return wishlist.save();
};
