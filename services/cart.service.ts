import { ICart } from "../interfaces/cart.interface";
import {
  clearCart,
  createCart,
  getCartByUser,
  getCartWithProducts,
  saveCart,
} from "../repositories/cart.repository";

const removeItemFromCart = (cart: ICart, productId: string) => {
  cart.items = cart.items.filter((item: any) =>
    item.product._id
      ? item.product._id.toString() !== productId
      : item.product.toString() !== productId,
  );
};

export const getCartService = async (userId: string) => {
  let cart = await getCartByUser(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return getCartWithProducts(userId);
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<ICart> => {
  const cart = await getCartByUser(userId);

  const actualCart = cart ?? (await createCart(userId));

  const existingItem = cart?.items.find((item: any) =>
    item.product._id
      ? item.product._id.toString() === productId.toString()
      : item.product.toString() === productId.toString(),
  );

  if (existingItem) {
    if (quantity <= 0) {
      removeItemFromCart(actualCart, productId);
    } else {
      existingItem.quantity = quantity;
    }
  } else if (quantity > 0) {
    actualCart.items.push({
      product: productId as any,
      quantity,
    });
  }

  await saveCart(actualCart);

  return (await getCartWithProducts(userId))!;
};

export const removeFromCartService = async (
  userId: string,
  productId: string,
) => {
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
