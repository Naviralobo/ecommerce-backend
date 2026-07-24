import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller";

import { ROLES } from "../constants/roles";
import { authorize, protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.post("/", protect, authorize(ROLES.ADMIN), createCategory);

router.put("/:id", protect, authorize(ROLES.ADMIN), updateCategory);

router.delete("/:id", protect, authorize(ROLES.ADMIN), deleteCategory);

export default router;
