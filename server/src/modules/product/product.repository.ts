import mongoose from "mongoose";

import { Product } from "./product.schema.ts";
import type { CreateProductInput } from "./product.validation.ts";

interface CreateProductRepositoryInput
  extends CreateProductInput {
  createdBy: mongoose.Types.ObjectId;
}

const createProductOperation = async (
  data: CreateProductRepositoryInput,
) => {
  return Product.create(data);
};

export { createProductOperation };