import cloudinary from "../config/cloudinary.ts";

import fs from "fs";

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "products",
    });
    await fs.promises.unlink(file.path);
    return {
    url: result.secure_url,
    publicId: result.public_id,
};
  } catch (error) {
    await fs.promises.unlink(file.path);

    throw error;
  }
};

