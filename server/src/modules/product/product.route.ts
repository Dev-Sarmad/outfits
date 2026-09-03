import express from "express";
import {
  authentication,
  authorization,
} from "../../shared/middleware/auth.middleware.ts";
import {
  createProduct,
  getProduct,
  getProducts,
  searchProducts,
  deleteProduct,
  updateProduct,
} from "./product.controller.ts";
import { validate } from "../../shared/middleware/validate.middleware.ts";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.ts";
import uploads from "../../shared/middleware/upload.middleware.ts";
const productRouter = express.Router();

productRouter.post(
  "/",
  authentication,
  authorization("admin"),
  uploads.fields([{ name: "images", maxCount: 3 }]),
  validate(createProductSchema),
  createProduct,
);
productRouter.get("/search", searchProducts);
productRouter.delete(
  "/:id",
  authentication,
  authorization("admin"),
  deleteProduct,
);
productRouter.patch(
  "/:id",
  authentication,
  authorization("admin"),
  uploads.fields([{ name: "images", maxCount: 3 }]),
  validate(updateProductSchema),
  updateProduct,
);
productRouter.get("/:id", getProduct);
productRouter.get("/", getProducts);
export default productRouter;
