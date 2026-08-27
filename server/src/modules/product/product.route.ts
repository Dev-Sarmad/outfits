import express from "express";
import {
  authentication,
  authorization,
} from "../../shared/middleware/auth.middleware.ts";
import { createProduct } from "./product.controller.ts";
import { validate } from "../../shared/middleware/validate.middleware.ts";
import { createProductSchema } from "./product.validation.ts";
import uploads from "../../shared/middleware/upload.middleware.ts"
const productRouter = express.Router();

productRouter.post(
  "/",
  authentication,
  authorization("admin"),
  uploads.fields([
    {name:"images", maxCount:3}
  ]),
  validate(createProductSchema),
  createProduct,
);

export default productRouter;
