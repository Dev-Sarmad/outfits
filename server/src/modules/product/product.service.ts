import mongoose from "mongoose";

import { createProductOperation } from "./product.repository.ts";

import type { CreateProductInput } from "./product.validation.ts";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.ts";
import { ApiError } from "../../shared/errors/ApiError.ts";

export const createProductService = async (
  data: CreateProductInput,
  userId: mongoose.Types.ObjectId,
  images: Express.Multer.File[],
) => {
  if (!images.length) {

   throw new ApiError(

      400,

      "Validation Error",

      "At least one image is required"

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
