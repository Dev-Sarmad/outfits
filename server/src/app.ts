import express from "express";
import authRouter from "./modules/auth/auth.route.ts";
import { errorHandler } from "./shared/middleware/error.middleware.ts";

const app = express();
app.use(express.json());
app.use(errorHandler)

app.use("/api/auth", authRouter);

export default app;
