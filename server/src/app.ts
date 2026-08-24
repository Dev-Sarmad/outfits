import express from "express";
import authRouter from "./modules/auth/auth.route.ts";
import { errorHandler } from "./shared/middleware/error.middleware.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRouter from "./modules/product/product.route.ts";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use(errorHandler);

export default app;
