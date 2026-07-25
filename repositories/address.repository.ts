import Address from "../models/address.model";
import { IAddress } from "../interfaces/address.interface";

export const createAddress = async (
  data: Partial<IAddress>
): Promise<IAddress> => {
  return Address.create(data);
};

export const getAddressesByUser = async (
  userId: string
): Promise<IAddress[]> => {
  return Address.find({ user: userId });
};

export const getAddressById = async (
  addressId: string
): Promise<IAddress | null> => {
  return Address.findById(addressId);
};

export const updateAddress = async (
  addressId: string,
  data: Partial<IAddress>
): Promise<IAddress | null> => {
  return Address.findByIdAndUpdate(addressId, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteAddress = async (
  addressId: string
): Promise<IAddress | null> => {
  return Address.findByIdAndDelete(addressId);
};

export const clearDefaultAddress = async (
  userId: string
): Promise<void> => {
  await Address.updateMany(
    { user: userId },
    { isDefault: false }
  );
};