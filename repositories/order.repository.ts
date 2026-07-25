import Order from "../models/order.model";
import { IOrder } from "../interfaces/order.interface";

export const createOrder = async (
  orderData: Partial<IOrder>
): Promise<IOrder> => {
  return Order.create(orderData);
};

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[]> => {
  return Order.find({ user: userId })
    .populate("address")
    .populate("items.product");
};

export const getOrderById = async (
  orderId: string
): Promise<IOrder | null> => {
  return Order.findById(orderId)
    .populate("address")
    .populate("items.product");
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<IOrder | null> => {
  return Order.findByIdAndUpdate(
    orderId,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};