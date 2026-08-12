import { Request, Response } from "express";

import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

import {
  getAllUsersService,
  updateUserRoleService,
} from "../services/admin.service";

export const getAllUsers = asyncHandler(async (_: Request, res: Response) => {
  const users = await getAllUsersService();

  res
    .status(200)
    .json(new ApiResponse(true, "Users fetched successfully", users));
});

export const updateUserRole = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await updateUserRoleService(req.params.id as string, req.body.role);

    res
      .status(200)
      .json(new ApiResponse(true, "User role updated successfully", user));
  },
);
