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
import { validate } from "../middleware/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "../validations/category.validation";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.post("/", protect, authorize(ROLES.ADMIN),validate(createCategorySchema), createCategory);

router.put("/:id", protect, authorize(ROLES.ADMIN),validate(updateCategorySchema), updateCategory);

router.delete("/:id", protect, authorize(ROLES.ADMIN), deleteCategory);

export default router;
