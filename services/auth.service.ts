import { createUser, findUserByEmail, getUserById } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<IUser> => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  return createUser({
    name,
    email,
    password,
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user._id.toString(), user.role);

  const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  const payload = verifyRefreshToken(refreshToken);

  const user = await getUserById(payload.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return generateAccessToken(
    user._id.toString(),
    user.role
  );
};


