import mongoose from "mongoose";

import { Product, type ProductImage } from "./product.schema.ts";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "./product.validation.ts";

interface CreateProductRepositoryInput extends CreateProductInput {
  images: ProductImage[];
  createdBy: mongoose.Types.ObjectId;
}
interface UpdateProductRepositoryInput extends UpdateProductInput {
  images?: ProductImage[];
}
const createProductOperation = async (data: CreateProductRepositoryInput) => {
  return Product.create(data);
};

const getProductsOperation = async () => {
  return await Product.find().select("-createdAt -updatedAt -createdBy");
};

const getSingleProductOperation = async (id: string) => {
  return await Product.findById(id);
};
const searchProductByNameOperation = async (name: string) => {
  return await Product.find({ title: { $regex: name, $options: "i" } });
};
const deleteProductOperation = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
const updateProductOperation = async (
  id: string,
  data: UpdateProductRepositoryInput,
  options: mongoose.QueryOptions,
) => {
  return await Product.findByIdAndUpdate(id, {
      $set: data
    }, options);
};
export {
  createProductOperation,
  getProductsOperation,
  getSingleProductOperation,
  searchProductByNameOperation,
  deleteProductOperation,
  updateProductOperation,
};
