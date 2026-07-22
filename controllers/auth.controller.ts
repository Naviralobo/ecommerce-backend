import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  res.status(201).json(
    new ApiResponse(true, "User registered successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
    })
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, user } = await loginUser(
    email,
    password
  );

  res.json(
    new ApiResponse(true, "Login successful", {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  );
});
