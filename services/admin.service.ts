import {
  getAllUsers,
  getUserById,
  saveUser,
} from "../repositories/admin.repository";

import { IUser } from "../interfaces/user.interface";
import { AppError } from "../utils/AppError";
import { ROLES } from "../constants/roles";

export const getAllUsersService = async (): Promise<IUser[]> => {
  return getAllUsers();
};

export const updateUserRoleService = async (
  userId: string,
  role: string,
): Promise<IUser> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (
    role !== ROLES.CUSTOMER &&
    role !== ROLES.SELLER &&
    role !== ROLES.ADMIN
  ) {
    throw new AppError("Invalid role", 400);
  }

  user.role = role;

  return saveUser(user);
};
