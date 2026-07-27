import { Router } from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";

import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

import {
  createReviewSchema,
  updateReviewSchema,
} from "../validations/review.validation";

const router = Router();

router.get("/:productId", getReviews);

router.post("/:productId", protect, validate(createReviewSchema), createReview);

router.put("/:id", protect, validate(updateReviewSchema), updateReview);

router.delete("/:id", protect, deleteReview);

export default router;
