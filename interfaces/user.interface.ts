import { Document } from "mongoose";
import { Role } from "../constants/roles";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;

  comparePassword(candidatePassword: string): Promise<boolean>;

  createdAt: Date;
  updatedAt: Date;
}