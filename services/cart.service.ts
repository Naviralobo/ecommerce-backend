import { ICart } from "../interfaces/cart.interface";
import {
  clearCart,
  createCart,
  getCartByUser,
  getCartWithProducts,
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

  return (await getCartWithProducts(userId))!;
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<ICart> => {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }
  const cart = await getCartByUser(userId);

  if (!cart) {
    const newCart = await createCart(userId);

    newCart.items.push({
      product: productId as any,
      quantity,
    });

    await saveCart(newCart);

    return (await getCartWithProducts(userId))!;
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cart.items.push({
      product: productId as any,
      quantity,
    });
  }

  await saveCart(cart);

  return (await getCartWithProducts(userId))!;
};

export const removeFromCartService = async (
  userId: string,
  productId: string,
): Promise<ICart | null> => {
  const cart = await getCartByUser(userId);

  if (!cart) {
    return null;
  }

  removeItemFromCart(cart, productId);

  await saveCart(cart);

  return getCartWithProducts(userId);
};

export const clearCartService = async (userId: string) => {
  return clearCart(userId);
};
