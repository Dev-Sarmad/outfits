import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.ts";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new ApiError(
          400,
          "Validation failed",
          result.error.issues.map((issue) => issue.message),
        ),
      );
    }
    req.body = result.data;
    next();
  };
};
