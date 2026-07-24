export const ROLES = {
  ADMIN: "admin",
  SELLER: "seller",
  CUSTOMER: "customer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
