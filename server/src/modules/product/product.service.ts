import mongoose from "mongoose";

import {
  createProductOperation,
  deleteProductOperation,
  getProductsOperation,
  getSingleProductOperation,
  searchProductByNameOperation,
  updateProductOperation,
} from "./product.repository.ts";

import type {
  CreateProductInput,
  UpdateProductInput,
} from "./product.validation.ts";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.ts";
import { ApiError } from "../../shared/errors/ApiError.ts";
import cloudinary from "../../config/cloudinary.ts";

export const createProductService = async (
  data: CreateProductInput,
  userId: mongoose.Types.ObjectId,
  images: Express.Multer.File[],
) => {
  if (!images.length) {
    throw new ApiError(
      400,

      "Validation Error",

      "At least one image is required",
    );
  }
  const imageUrls = await Promise.all(images.map(uploadToCloudinary));
  const product = await createProductOperation({
    ...data,
    images: imageUrls,
    createdBy: userId,
  });

  return product;
};

export const getProductsService = async () => {
  const products = await getProductsOperation();
  if (!products) {
    throw new ApiError(404, "Not Found", "No products found");
  }
  return products;
};

export const getSingleProductService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(
      400,
      "Invalid product ID",
      "No product found with this ID",
    );
  }

  const product = await getSingleProductOperation(id);
  if (!product) {
    throw new ApiError(
      400,
      "There is No Product Found",
      "Product not found with an id",
    );
  }
  return product;
};

export const searchProductService = async (name: string) => {
  const products = await searchProductByNameOperation(name);
  if (!products || products.length == 0) {
    throw new ApiError(404, "Not found", "No products found with this name");
  }
  return products;
};

export const deleteProductService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(
      400,
      "Invalid product ID",
      "No product found with this ID",
    );
  }
  const product = await getSingleProductOperation(id);
  if (!product) {
    throw new ApiError(404, "Not Found", "No product found with this ID");
  }
  try {
    await Promise.all(
      product.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId),
      ),
    );
  } catch (error) {
    throw new ApiError(500, "Cloudinary Error", "Failed to delete images.");
  }
  await deleteProductOperation(id);
};
export const updateProductService = async (
  id: string,
  userId: mongoose.Types.ObjectId,
  data: UpdateProductInput,
  images: Express.Multer.File[],
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(
      400,
      "Invalid product ID",
      "No product found with this ID",
    );
  }
  const product = await getSingleProductOperation(id);
  if (!product) {
    throw new ApiError(404, "Not Found", "No product found with this ID");
  }
  let updatedImages = product.images;

  if (images && images.length > 0) {
    await Promise.all(
      product.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId),
      ),
    );
    updatedImages = await Promise.all(images.map(uploadToCloudinary));
  }
  const updatedProduct = await updateProductOperation(
    id,
    {
      ...data,
      images: updatedImages,
    },
    { new: true },
  );
  return updatedProduct;
};
