import { ICart } from "../interfaces/cart.interface";
import {
  clearCart,
  createCart,
  getCartByUser,
  saveCart,
} from "../repositories/cart.repository";

const removeItemFromCart = (cart: ICart, productId: string) => {
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );
};

export const getCartService = async (userId: string): Promise<ICart> => {
  let cart = await getCartByUser(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return cart;
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<ICart> => {
  const cart = await getCartService(userId);

  const existingItem = cart?.items.find(
    (item: any) => item.product.toString() === productId.toString(),
  );

  if (existingItem) {
    if (quantity <= 0) {
      removeItemFromCart(cart, productId);
    } else {
      existingItem.quantity = quantity;
    }
  } else {
    cart?.items.push({
      product: productId as any,
      quantity,
    });
  }

  return saveCart(cart);
};

export const removeFromCartService = async (
  userId: string,
  productId: string,
) => {
  const cart = await getCartService(userId);

  removeItemFromCart(cart, productId);

  return saveCart(cart);
};

export const clearCartService = async (userId: string) => {
  return clearCart(userId);
};
