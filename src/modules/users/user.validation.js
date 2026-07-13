import { z } from "zod";

const userRoles = [
  "ADMIN",
  "BUSINESS_INTELLIGENCE",
  "INVENTORY_MANAGER",
  "PURCHASE_MANAGER",
  "SALES_MANAGER",
  "STAFF",
];

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),

  role: z.enum(userRoles),

  isActive: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .optional(),

  email: z
    .string()
    .trim()
    .email()
    .optional(),

  role: z
    .enum(userRoles)
    .optional(),
});

export const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});