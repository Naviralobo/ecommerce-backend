import { AppError } from "../utils/AppError";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByIdForUser,
  getOrdersByUser,
  updateOrderStatus,
} from "../repositories/order.repository";
import { getCartByUser, clearCart } from "../repositories/cart.repository";
import { getProductById, updateProduct } from "../repositories/product.repository";
import {
  IOrder,
  IShippingAddress,
  OrderStatus,
} from "../interfaces/order.interface";

export const createOrderService = async (
  userId: string,
  shippingAddress: IShippingAddress,
): Promise<IOrder> => {
  const cart = await getCartByUser(userId);

  if (!cart || cart.items.length === 0) {
    throw new AppError("Your cart is empty", 400);
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const cartItem of cart.items) {
    const productId = cartItem.product.toString();

    const product = await getProductById(productId);

    if (!product) {
      throw new AppError("One or more products no longer exist", 404);
    }

    if (product.stock < cartItem.quantity) {
      throw new AppError(
        `Insufficient stock for ${product.name}`,
        400,
      );
    }

    const itemTotal = product.price * cartItem.quantity;

    totalAmount += itemTotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity,
      image: product.images[0] ?? "",
    });
  }

  const order = await createOrder({
    user: userId as any,
    items: orderItems,
    totalAmount,
    shippingAddress,
    status: OrderStatus.PENDING,
  });

  /*
   * Reduce stock only after the order has been created.
   */
  for (const cartItem of cart.items) {
    const productId = cartItem.product.toString();

    const product = await getProductById(productId);

    if (!product) {
      continue;
    }

    product.stock -= cartItem.quantity;

    await updateProduct(productId, {
      stock: product.stock,
    } as any);
  }

  /*
   * Clear the cart after successful order creation.
   */
  await clearCart(userId);

  return order;
};

export const getMyOrdersService = async (
  userId: string,
): Promise<IOrder[]> => {
  return getOrdersByUser(userId);
};

export const getMyOrderService = async (
  orderId: string,
  userId: string,
): Promise<IOrder> => {
  const order = await getOrderByIdForUser(orderId, userId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export const getOrderService = async (
  orderId: string,
): Promise<IOrder> => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export const getAllOrdersService = async (): Promise<IOrder[]> => {
  return getAllOrders();
};

export const updateOrderStatusService = async (
  orderId: string,
  status: OrderStatus,
): Promise<IOrder> => {
  const order = await updateOrderStatus(orderId, status);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};