import { Router } from "express";
import {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../controllers/wishlist.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, getWishlist);

router.post("/:productId", protect, addProductToWishlist);

router.delete("/:productId", protect, removeProductFromWishlist);

export default router;