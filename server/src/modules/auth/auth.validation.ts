import { z } from "zod";

const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name at most be 50 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
    // .regex(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    //   "Password must contain uppercase, lowercase and number"
    // ),
  role: z.enum(["admin", "customer"]).default("customer"),
  age: z.number().optional(),
});

const loginUserSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export {registerUserSchema, loginUserSchema}

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;