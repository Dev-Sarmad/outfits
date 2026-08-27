import mongoose from "mongoose";

import { Product, type ProductImage } from "./product.schema.ts";
import type { CreateProductInput } from "./product.validation.ts";

interface CreateProductRepositoryInput
  extends CreateProductInput {
    images: ProductImage[];
  createdBy: mongoose.Types.ObjectId;
}

const createProductOperation = async (
  data: CreateProductRepositoryInput,
) => {
  return Product.create(data);
};

export { createProductOperation };