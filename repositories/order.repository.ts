import Order from "../models/order.model";
import { IOrder, OrderStatus } from "../interfaces/order.interface";

export const createOrder = async (
  orderData: Partial<IOrder>,
): Promise<IOrder> => {
  return Order.create(orderData);
};

export const getOrdersByUser = async (
  userId: string,
): Promise<IOrder[]> => {
  return Order.find({
    user: userId,
  })
    .populate("items.product")
    .sort({ createdAt: -1 });
};

export const getOrderById = async (
  orderId: string,
): Promise<IOrder | null> => {
  return Order.findById(orderId).populate("items.product");
};

export const getOrderByIdForUser = async (
  orderId: string,
  userId: string,
): Promise<IOrder | null> => {
  return Order.findOne({
    _id: orderId,
    user: userId,
  }).populate("items.product");
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  return Order.find()
    .populate("user", "name email")
    .populate("items.product")
    .sort({ createdAt: -1 });
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
): Promise<IOrder | null> => {
  return Order.findByIdAndUpdate(
    orderId,
    { status },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("user", "name email")
    .populate("items.product");
};