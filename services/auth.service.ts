import { createUser, findUserByEmail } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  return createUser({
    name,
    email,
    password,
  });
};