import { IAddress } from "../interfaces/address.interface";
import { AppError } from "../utils/AppError";
import {
  createAddress,
  getAddressesByUser,
  getAddressById,
  updateAddress,
  deleteAddress,
  clearDefaultAddress,
} from "../repositories/address.repository";
import { ROLES } from "../constants/roles";

export const createAddressService = async (
  userId: string,
  addressData: Partial<IAddress>,
): Promise<IAddress> => {
  addressData.user = userId as any;

  if (addressData.isDefault) {
    await clearDefaultAddress(userId);
  }

  return createAddress(addressData);
};

export const getAddressesService = async (
  userId: string,
): Promise<IAddress[]> => {
  return getAddressesByUser(userId);
};

export const updateAddressService = async (
  addressId: string,
  userId: string,
  role: string,
  addressData: Partial<IAddress>,
): Promise<IAddress> => {
  const address = await getAddressById(addressId);

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  if (role !== ROLES.ADMIN && address.user.toString() !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  if (addressData.isDefault) {
    await clearDefaultAddress(userId);
  }

  const updatedAddress = await updateAddress(addressId, addressData);

  if (!updatedAddress) {
    throw new AppError("Address not found", 404);
  }

  return updatedAddress;
};

export const deleteAddressService = async (
  addressId: string,
  userId: string,
  role: string,
): Promise<void> => {
  const address = await getAddressById(addressId);

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  if (role !== ROLES.ADMIN && address.user.toString() !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  await deleteAddress(addressId);
};
