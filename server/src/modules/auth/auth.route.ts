import express from "express";
import { login, register } from "./auth.controller.ts";
import { validate } from "../../shared/middleware/validate.middleware.ts";
import { loginUserSchema, registerUserSchema } from "./auth.validation.ts";
const authRouter = express.Router();

authRouter.post("/register", validate(registerUserSchema), register);
authRouter.post("/login", validate(loginUserSchema), login);

export default authRouter;
