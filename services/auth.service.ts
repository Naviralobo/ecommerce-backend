import { createUser, findUserByEmail } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";
import { generateAccessToken } from "../utils/jwt";

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

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(
    user._id.toString(),
    user.role
  );

  return {
    accessToken,
    user,
  };
};