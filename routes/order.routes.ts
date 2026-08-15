import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getMyOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/order.controller";
import { protect, authorize } from "../middleware/auth.middleware";
import { ROLES } from "../constants/roles";

const router = Router();

/*
 * Customer
 */
router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/my-orders/:id", protect, getMyOrder);

/*
 * Admin
 */
router.get(
  "/admin/all",
  protect,
  authorize(ROLES.ADMIN),
  getAllOrders,
);

router.get(
  "/admin/:id",
  protect,
  authorize(ROLES.ADMIN),
  getOrder,
);

router.patch(
  "/admin/:id/status",
  protect,
  authorize(ROLES.ADMIN),
  updateOrderStatus,
);

export default router;