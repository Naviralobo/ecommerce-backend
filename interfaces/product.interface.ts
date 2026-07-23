import { Document } from "mongoose";
import { ProductStatus } from "../constants/product";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}