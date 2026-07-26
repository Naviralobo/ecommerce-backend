import { z } from "zod";

export const createAddressSchema = z.object({
  body: z.object({
    fullName: z.string().min(3),
    phone: z.string().min(10).max(15),
    house: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    postalCode: z.string().min(4),
    isDefault: z.boolean().optional(),
  }),
});

export const updateAddressSchema = z.object({
  body: createAddressSchema.shape.body.partial(),
});