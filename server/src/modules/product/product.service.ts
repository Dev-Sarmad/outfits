import mongoose from "mongoose";

import {
  createProductOperation,
} from "./product.repository.ts";

import type {
  CreateProductInput,
} from "./product.validation.ts";

export const createProductService = async (
  data: CreateProductInput,
  userId: mongoose.Types.ObjectId,
) => {
  const product = await createProductOperation({
    ...data,
    createdBy: userId,
  });

  return product;
};