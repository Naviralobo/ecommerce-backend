import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  createOrderService,
  getAllOrdersService,
  getMyOrderService,
  getMyOrdersService,
  getOrderService,
  updateOrderStatusService,
} from "../services/order.service";
import { OrderStatus } from "../interfaces/order.interface";

export const createOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await createOrderService(
      req.user!.id,
      req.body.shippingAddress,
    );

    res
      .status(201)
      .json(new ApiResponse(true, "Order created successfully", order));
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

export const getMyOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await getMyOrderService(
      req.params.id as string,
      req.user!.id,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Order fetched successfully", order));
  },
);

export const getAllOrders = asyncHandler(
  async (_req: AuthRequest, res: Response) => {
    const orders = await getAllOrdersService();

    res
      .status(200)
      .json(new ApiResponse(true, "Orders fetched successfully", orders));
  },
);

export const getOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await getOrderService(req.params.id as string);

    res
      .status(200)
      .json(new ApiResponse(true, "Order fetched successfully", order));
  },
);

export const updateOrderStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await updateOrderStatusService(
      req.params.id as string,
      req.body.status as OrderStatus,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Order status updated successfully", order));
  },
);