import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/order.controller";
import { protect, authorize } from "../middleware/auth.middleware";
import { ROLES } from "../constants/roles";

const router = Router();

router.post("/", protect, createOrder);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrder);

router.put(
  "/:id/status",
  protect,
  authorize(ROLES.ADMIN),
  updateOrderStatus
);

export default router;