import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  createAddressService,
  getAddressesService,
  updateAddressService,
  deleteAddressService,
} from "../services/address.service";

export const createAddress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const address = await createAddressService(req.user!.id, req.body);

    res
      .status(201)
      .json(new ApiResponse(true, "Address created successfully", address));
  },
);

export const getAddresses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const addresses = await getAddressesService(req.user!.id);

    res
      .status(200)
      .json(new ApiResponse(true, "Addresses fetched successfully", addresses));
  },
);

export const updateAddress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const address = await updateAddressService(
      req.params.id as string,
      req.user!.id,
      req.user!.role,
      req.body,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Address updated successfully", address));
  },
);

export const deleteAddress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteAddressService(req.params.id as string, req.user!.id, req.user!.role);

    res
      .status(200)
      .json(new ApiResponse(true, "Address deleted successfully", null));
  },
);
