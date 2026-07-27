import { IReview } from "../interfaces/review.interface";
import { hasPurchasedProduct } from "../repositories/order.repository";
import { updateProductRating } from "../repositories/product.repository";
import {
  getReviewByUserAndProduct,
  createReview,
  getReviewStats,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByProduct,
} from "../repositories/review.repository";
import { AppError } from "../utils/AppError";

export const createReviewService = async (
  userId: string,
  productId: string,
  reviewData: Partial<IReview>,
): Promise<IReview> => {
  const purchased = await hasPurchasedProduct(userId, productId);

  if (!purchased) {
    throw new AppError("You can review only purchased products", 403);
  }

  const existingReview = await getReviewByUserAndProduct(userId, productId);

  if (existingReview) {
    throw new AppError("You have already reviewed this product", 409);
  }

  const review = await createReview({
    ...reviewData,
    user: userId as any,
    product: productId as any,
  });

  const stats = await getReviewStats(productId);

  await updateProductRating(productId, stats.averageRating, stats.numReviews);

  return review;
};

export const updateReviewService = async (
  reviewId: string,
  userId: string,
  reviewData: Partial<IReview>,
): Promise<IReview> => {
  const review = await getReviewById(reviewId);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  if (review.user.toString() !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  const updatedReview = await updateReview(reviewId, reviewData);

  if (!updatedReview) {
    throw new AppError("Review not found", 404);
  }

  const stats = await getReviewStats(review.product.toString());

  await updateProductRating(
    review.product.toString(),
    stats.averageRating,
    stats.numReviews,
  );

  return updatedReview;
};

export const deleteReviewService = async (
  reviewId: string,
  userId: string
): Promise<void> => {
  const review = await getReviewById(reviewId);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  if (review.user.toString() !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  await deleteReview(reviewId);

  const stats = await getReviewStats(
    review.product.toString()
  );

  await updateProductRating(
    review.product.toString(),
    stats.averageRating,
    stats.numReviews
  );
};

export const getReviewsService = async (
  productId: string
): Promise<IReview[]> => {
  return getReviewsByProduct(productId);
};