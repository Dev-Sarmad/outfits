import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    console.error(err);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.error,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};