import { Schema, model } from "mongoose";
import { IReview } from "../interfaces/review.interface";

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

export default model<IReview>("Review", reviewSchema);
