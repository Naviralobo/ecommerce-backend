import { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, getCart);

router.post("/:productId", protect, addToCart);

router.delete("/:productId", protect, removeFromCart);

router.delete("/", protect, clearCart);

export default router;
