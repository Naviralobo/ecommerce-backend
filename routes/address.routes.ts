import { Router } from "express";
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";
import { protect } from "../middleware/auth.middleware";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validations/address.validation";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post("/", protect, validate(createAddressSchema), createAddress);
router.get("/", protect, getAddresses);
router.put("/:id", protect, validate(updateAddressSchema), updateAddress);
router.delete("/:id", protect, deleteAddress);

export default router;
