import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.ts";
import mongoose from "mongoose";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
        success:false,
        message:"Database validation failed",
        errors:Object.values(err.errors)
          .map(e => e.message)
    });
}
  if (err instanceof ApiError) {
    console.error(err);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.error,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};