import { z } from "zod";

/**
 * CREATE NEWS
 */
export const createNewsSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters"),
    // .max(200, "Title is too long"),

  content: z.string().min(20, "Content must be at least 20 characters"),

  category: z.string().min(2, "Category is required"),

  source: z.string().min(2, "Source is required"),

//   image: z.string().url("Image must be a valid URL"),
});

/**
 * UPDATE NEWS
 * (everything optional but validated if present)
 */
export const updateNewsSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    // .max(200, "Title is too long")
    .optional(),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .optional(),

  category: z.string().min(2, "Category is required").optional(),

//   image: z.string().url("Image must be a valid URL").optional(),
});
