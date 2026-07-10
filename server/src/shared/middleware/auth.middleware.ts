import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.ts";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.ts";
import { findUserById } from "../../modules/auth/auth.repository.ts";
interface JwtPayload {
  _id: string;
}
export const authentication = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const accessToken =
      request.cookies?.accessToken ||
      request.headers.authorization?.replace("Bearer ", "");
    if (!accessToken) {
      throw new ApiError(404, "Token is missing or expired", [
        "Authentication token is missing",
      ]);
    }
    const decoded = jwt.verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET,
    ) as JwtPayload;
    const user = await findUserById(decoded._id);
    if (!user) {
      throw new ApiError(401, "Unauthorized", ["Un expected token"]);
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
