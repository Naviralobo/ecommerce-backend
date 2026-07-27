import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  createReviewService,
  updateReviewService,
  deleteReviewService,
  getReviewsService,
} from "../services/review.service";

export const createReview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const review = await createReviewService(
      req.user!.id,
      req.params.productId as string,
      req.body,
    );

    res
      .status(201)
      .json(new ApiResponse(true, "Review added successfully", review));
  },
);

export const getReviews = asyncHandler(async (req, res: Response) => {
  const reviews = await getReviewsService(req.params.productId as string);

  res
    .status(200)
    .json(new ApiResponse(true, "Reviews fetched successfully", reviews));
});

export const updateReview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const review = await updateReviewService(
      req.params.id as string,
      req.user!.id,
      req.body,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Review updated successfully", review));
  },
);

export const deleteReview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteReviewService(req.params.id as string, req.user!.id);

    res
      .status(200)
      .json(new ApiResponse(true, "Review deleted successfully", null));
  },
);
