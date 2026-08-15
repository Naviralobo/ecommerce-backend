import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  refreshAccessToken,
  registerUser,
  loginUser,
} from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  res.status(201).json(
    new ApiResponse(true, "User registered successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
    }),
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  res.json(
    new ApiResponse(true, "Login successful", {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }),
  );
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new AppError("Refresh token missing", 401);
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshAccessToken(token);

  res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

  res.status(200).json(
    new ApiResponse(true, "Access token refreshed", {
      accessToken,
    }),
  );
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("refreshToken", refreshCookieOptions);

  res.status(200).json(
    new ApiResponse(true, "Logged out successfully", null),
  );
});

