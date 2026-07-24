import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  getWishlistService,
  addProductToWishlistService,
  removeProductFromWishlistService,
} from "../services/wishlist.service";

export const getWishlist = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const wishlist = await getWishlistService(req.user!.id);

    res
      .status(200)
      .json(new ApiResponse(true, "Wishlist fetched successfully", wishlist));
  },
);

export const addProductToWishlist = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const wishlist = await addProductToWishlistService(
      req.user!.id,
      req.params.productId as string,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Product added to wishlist", wishlist));
  },
);

export const removeProductFromWishlist = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const wishlist = await removeProductFromWishlistService(
      req.user!.id,
      req.params.productId as string,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Product removed from wishlist", wishlist));
  },
);
