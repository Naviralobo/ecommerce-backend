import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    addressId: z.string(),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    status: z.enum([
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ]),
  }),
});