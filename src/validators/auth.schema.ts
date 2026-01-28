import { z } from "zod";

/* ---------------- SIGNUP ---------------- */
export const signupSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name too long"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    // .min(8, "Password must be at least 8 characters")
    // .regex(/[A-Z]/, "Password must contain one uppercase letter")
    // .regex(/[0-9]/, "Password must contain one number"),
});

/* ---------------- LOGIN ---------------- */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

/* ---------------- RESET PASSWORD REQUEST ---------------- */
export const resetPasswordRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/* ---------------- RESET PASSWORD ---------------- */
export const resetPasswordSchema = z.object({
  password: z
    .string()
    // .min(8, "Password must be at least 8 characters")
    // .regex(/[A-Z]/, "Password must contain one uppercase letter")
    // .regex(/[0-9]/, "Password must contain one number"),
});
