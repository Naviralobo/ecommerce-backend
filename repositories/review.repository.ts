import Review from "../models/review.model";
import { IReview } from "../interfaces/review.interface";
import { Types } from "mongoose";

export const createReview = async (
  data: Partial<IReview>,
): Promise<IReview> => {
  return Review.create(data);
};

export const getReviewByUserAndProduct = async (
  userId: string,
  productId: string,
): Promise<IReview | null> => {
  return Review.findOne({
    user: userId,
    product: productId,
  });
};

export const getReviewsByProduct = async (
  productId: string,
): Promise<IReview[]> => {
  return Review.find({ product: productId }).populate("user", "name");
};

export const updateReview = async (
  reviewId: string,
  data: Partial<IReview>,
): Promise<IReview | null> => {
  return Review.findByIdAndUpdate(reviewId, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteReview = async (
  reviewId: string,
): Promise<IReview | null> => {
  return Review.findByIdAndDelete(reviewId);
};

export const getReviewById = async (
  reviewId: string,
): Promise<IReview | null> => {
  return Review.findById(reviewId);
};

export const getReviewStats = async (productId: string) => {
  const result = await Review.aggregate([
    {
      $match: {
        product: new Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  return (
    result[0] ?? {
      averageRating: 0,
      numReviews: 0,
    }
  );
};
