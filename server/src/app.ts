import express from "express";
import authRouter from "./modules/auth/auth.route.ts";
import { errorHandler } from "./shared/middleware/error.middleware.ts";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(errorHandler);

export default app;
