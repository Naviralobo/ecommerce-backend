import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  createOrderService,
  getMyOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} from "../services/order.service";

export const createOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await createOrderService(req.user!.id, req.body.addressId);

    res
      .status(201)
      .json(new ApiResponse(true, "Order placed successfully", order));
  },
);

export const getMyOrders = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const orders = await getMyOrdersService(req.user!.id);

    res
      .status(200)
      .json(new ApiResponse(true, "Orders fetched successfully", orders));
  },
);

export const getOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await getOrderByIdService(
      req.params.id as string,
      req.user!.id,
      req.user!.role,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Order fetched successfully", order));
  },
);

export const updateOrderStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await updateOrderStatusService(
      req.params.id as string,
      req.body.status,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Order status updated successfully", order));
  },
);
