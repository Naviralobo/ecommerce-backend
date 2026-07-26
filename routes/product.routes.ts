import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { authorize, protect } from "../middleware/auth.middleware";
import { ROLES } from "../constants/roles";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/",
  protect,
  authorize(ROLES.SELLER, ROLES.ADMIN),
  validate(createProductSchema),
  createProduct,
);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", validate(updateProductSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
