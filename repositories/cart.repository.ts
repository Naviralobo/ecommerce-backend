import { ICart } from "../interfaces/cart.interface";
import Cart from "../models/cart.model";

export const getCartByUser = async (userId: string): Promise<ICart | null> => {
  return Cart.findOne({ user: userId });
};

export const getCartWithProducts = async (
  userId: string,
): Promise<ICart | null> => {
  return Cart.findOne({ user: userId }).populate("items.product");
};

export const createCart = async (userId: string): Promise<ICart> => {
  return Cart.create({ user: userId, items: [] });
};

export const saveCart = async (cart: any): Promise<any> => {
  return cart.save();
};

export const clearCart = async (userId: string) => {
  return Cart.findOneAndUpdate({ user: userId }, { items: [] }, { new: true });
};
