import { Document, Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrder extends Document {
  user: Types.ObjectId;
  address: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
}
