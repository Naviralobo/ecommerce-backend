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

const router = Router();

router.post(
  "/",
  protect,
  authorize(ROLES.SELLER, ROLES.ADMIN),
  createProduct
);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
