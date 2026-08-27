import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../shared/responses/ApiResponse.ts";
import { createProductService } from "./product.service.ts";

const createProduct = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const files = request.files as { images?: Express.Multer.File[] };

    const product = await createProductService(
      request.body,
      request.user!._id,
      files.images || []
    );
    return response
      .status(201)
      .json(new ApiResponse(201, "Product created successfully", product));
  } catch (error) {
    next(error);
  }
};

export { createProduct };
