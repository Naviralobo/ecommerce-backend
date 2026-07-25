import { Types } from "mongoose";
import { IOrder } from "../interfaces/order.interface";
import { AppError } from "../utils/AppError";
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
} from "../repositories/order.repository";
import { getCartService } from "./cart.service";
import { clearCart } from "../repositories/cart.repository";
import { getAddressById } from "../repositories/address.repository";
import { ROLES } from "../constants/roles";

export const createOrderService = async (
  userId: string,
  addressId: string
): Promise<IOrder> => {
  const cart = await getCartService(userId);

  if (cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  const address = await getAddressById(addressId);

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  let totalAmount = 0;

  const items = cart.items.map((item: any) => {
    const price = item.product.price;

    totalAmount += price * item.quantity;

    return {
      product: item.product._id,
      quantity: item.quantity,
      price,
    };
  });

  const order = await createOrder({
    user: new Types.ObjectId(userId),
    address: new Types.ObjectId(addressId),
    items,
    totalAmount,
  });

  await clearCart(userId);

  return order;
};

export const getMyOrdersService = async (
  userId: string
): Promise<IOrder[]> => {
  return getOrdersByUser(userId);
};

export const getOrderByIdService = async (
  orderId: string,
  userId: string,
  role: string
): Promise<IOrder> => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (
    role !== ROLES.ADMIN &&
    order.user.toString() !== userId
  ) {
    throw new AppError("Unauthorized", 403);
  }

  return order;
};

export const updateOrderStatusService = async (
  orderId: string,
  status: string
): Promise<IOrder> => {
  const order = await updateOrderStatus(orderId, status);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};