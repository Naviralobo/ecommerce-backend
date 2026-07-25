import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  getCartService,
  addToCartService,
  removeFromCartService,
  clearCartService,
} from "../services/cart.service";

export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const cart = await getCartService(req.user!.id);

  res
    .status(200)
    .json(new ApiResponse(true, "Cart fetched successfully", cart));
});

export const addToCart = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const cart = await addToCartService(
      req.user!.id,
      req.params.productId as string,
      Number(req.body.quantity ?? 1),
    );

    res.status(200).json(new ApiResponse(true, "Product added to cart", cart));
  },
);

export const removeFromCart = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const cart = await removeFromCartService(
      req.user!.id,
      req.params.productId as string,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Product removed from cart", cart));
  },
);

export const clearCart = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const cart = await clearCartService(req.user!.id);

    res
      .status(200)
      .json(new ApiResponse(true, "Cart cleared successfully", cart));
  },
);
