import type { NextFunction } from "express";
import { ApiError } from "../errors/ApiError.ts";

export const validate = (schema) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, result.error,["validation error"] )
    }
    result.success = req.body
    next();
  };
};