import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../shared/responses/ApiResponse.ts";
import {
  createProductService,
  deleteProductService,
  getProductsService,
  getSingleProductService,
  searchProductService,
  updateProductService,
} from "./product.service.ts";

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
      files.images || [],
    );
    return response
      .status(201)
      .json(new ApiResponse(201, "Product created successfully", product));
  } catch (error) {
    next(error);
  }
};

const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const products = await getProductsService();
    return response
      .status(200)
      .json(new ApiResponse(200, "Products Fetched Successfully", products));
  } catch (error) {
    next(error);
  }
};
const getProduct = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;

    const product = await getSingleProductService(id);
    return response
      .status(200)
      .json(new ApiResponse(200, "Product Fetched", product));
  } catch (error) {
    next(error);
  }
};
const searchProducts = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name } = request.query;
    console.log(request.query.name);
    console.log(name);
    const products = await searchProductService(name as string);
    return response
      .status(200)
      .json(new ApiResponse(200, "Products found", products));
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    await deleteProductService(id);
    return response
      .status(204)
      .json(new ApiResponse(204, "Product deleted successfully", null));
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const images = request.files as { images?: Express.Multer.File[] };
    const updatedProduct = await updateProductService(
      id,
      request.user!._id,
      request.body,
      images.images || [],
    );
    return response
      .status(200)
      .json(
        new ApiResponse(200, "Product updated successfully", updatedProduct),
      );
  } catch (error) {
    next(error);
  }
};
export {
  createProduct,
  getProducts,
  getProduct,
  searchProducts,
  deleteProduct,
  updateProduct,
};
