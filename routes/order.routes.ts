import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/order.controller";
import { protect, authorize } from "../middleware/auth.middleware";
import { ROLES } from "../constants/roles";
import { validate } from "../middleware/validate.middleware";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../validations/order.validation";

const router = Router();

router.post("/", protect, validate(createOrderSchema), createOrder);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrder);

router.put(
  "/:id/status",
  protect,
  authorize(ROLES.ADMIN),
  validate(updateOrderSchema),
  updateOrderStatus,
);

export default router;
