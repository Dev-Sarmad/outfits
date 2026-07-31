import { z } from "zod";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name at most be 50 characters long"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export { loginSchema, signUpSchema };

export type loginFormData = z.infer<typeof loginSchema>;
export type signUpFormData = z.infer<typeof signUpSchema>;
