import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";
import { upload } from "../middleware/upload.middleware";
import { protect, authorize } from "../middleware/auth.middleware";
import { ROLES } from "../constants/roles";

const router = Router();

router.post(
  "/",
  protect,
  authorize(ROLES.ADMIN, ROLES.SELLER),
  upload.single("image"),
  uploadImage
);

export default router;