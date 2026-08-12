import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export const getAllUsers = (): Promise<IUser[]> => {
  return User.find().select("-password");
};

export const getUserById = (
  userId: string,
): Promise<IUser | null> => {
  return User.findById(userId);
};

export const saveUser = (
  user: IUser,
): Promise<IUser> => {
  return user.save();
};