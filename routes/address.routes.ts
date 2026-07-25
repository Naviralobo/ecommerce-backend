import { Router } from "express";
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createAddress);
router.get("/", protect, getAddresses);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

export default router;