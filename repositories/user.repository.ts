import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export const findUserByEmail = async (
  email: string
): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const createUser = async (
  data: Partial<IUser>
): Promise<IUser> => {
  return User.create(data);
};