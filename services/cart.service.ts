import { ICart } from "../interfaces/cart.interface";
import {
  clearCart,
  createCart,
  getCartByUser,
  getCartWithProducts,
  saveCart,
} from "../repositories/cart.repository";
import { getPublicFileUrlService } from "./upload.service";

const toPlainObject = <T>(value: T): T => {
  if (value && typeof value === "object" && "toObject" in value) {
    return (value as any).toObject();
  }

  return value;
};

const normalizeProductImages = (product: any) => {
  if (!product) return product;

  const plainProduct = toPlainObject(product);

  return {
    ...plainProduct,
    images: Array.isArray(plainProduct.images)
      ? plainProduct.images.map((image: string) =>
          typeof image === "string" ? getPublicFileUrlService(image) : image,
        )
      : plainProduct.images,
  };
};

const normalizeCartItem = (item: any) => {
  if (!item) return item;

  const plainItem = toPlainObject(item);

  return {
    ...plainItem,
    product: normalizeProductImages(plainItem.product),
  };
};

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

  const populatedCart = (await getCartWithProducts(userId))!;

  if (!populatedCart) {
    return cart;
  }

  const plainCart = toPlainObject(populatedCart);

  return {
    ...plainCart,
    items: plainCart.items.map(normalizeCartItem),
  } as ICart;
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

    const populatedCart = (await getCartWithProducts(userId))!;

    const plainCart = toPlainObject(populatedCart);

    return {
      ...plainCart,
      items: plainCart.items.map(normalizeCartItem),
    } as ICart;
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

  const populatedCart = (await getCartWithProducts(userId))!;
  const plainCart = toPlainObject(populatedCart);

  return {
    ...plainCart,
    items: plainCart.items.map(normalizeCartItem),
  } as ICart;
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

  const populatedCart = await getCartWithProducts(userId);

  if (!populatedCart) {
    return null;
  }

  const plainCart = toPlainObject(populatedCart);

  return {
    ...plainCart,
    items: plainCart.items.map(normalizeCartItem),
  } as ICart;
};

export const clearCartService = async (userId: string) => {
  const cart = await clearCart(userId);

  if (!cart) {
    return cart;
  }

  const plainCart = toPlainObject(cart);

  return {
    ...plainCart,
    items: plainCart.items.map(normalizeCartItem),
  } as ICart;
};
