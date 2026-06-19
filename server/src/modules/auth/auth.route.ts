import express from "express";
import { register } from "./auth.controller.ts";
import { validate } from "../../shared/middleware/validate.middleware.ts";
import { registerUserSchema } from "./auth.validation.ts";
const authRouter = express.Router();

authRouter.post("/register", validate(registerUserSchema), register);

export default authRouter;
