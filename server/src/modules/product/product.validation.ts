import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Product name is required"
          : "Title must be a string",
    })
    .min(1, "Product name is required")
    .max(100, "Product name must not exceed 100 characters"),

  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Description is required"
          : "Description must be a string",
    })
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .min(10, "Description must be at least 10 characters"),

  price: z.coerce
    .number({
      error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  stock: z.coerce
    .number({
      error: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
