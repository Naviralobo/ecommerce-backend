import { Router } from "express";

import {
  getAllUsers,
  updateUserRole,
} from "../controllers/admin.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

import { ROLES } from "../constants/roles";

const router = Router();

router.use(protect);

router.use(authorize(ROLES.ADMIN));

router.get("/users", getAllUsers);

router.patch("/users/:id/role", updateUserRole);

export default router;