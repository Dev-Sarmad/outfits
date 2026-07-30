import express from "express";
import { login, register, logout, authcheck } from "./auth.controller.ts";
import { validate } from "../../shared/middleware/validate.middleware.ts";
import { loginUserSchema, registerUserSchema } from "./auth.validation.ts";
import { authentication } from "../../shared/middleware/auth.middleware.ts";
const authRouter = express.Router();

authRouter.post("/register", validate(registerUserSchema), register);
authRouter.post("/login", validate(loginUserSchema), login);
authRouter.post("/logout",authentication ,logout)
authRouter.get("/me", authentication, authcheck)

export default authRouter;
