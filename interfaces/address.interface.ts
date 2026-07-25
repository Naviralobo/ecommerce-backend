import { Document, Types } from "mongoose";

export interface IAddress extends Document {
  user: Types.ObjectId;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: true;
}
