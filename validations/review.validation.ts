import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const updateReviewSchema = z.object({
  body: createReviewSchema.shape.body.partial(),
});