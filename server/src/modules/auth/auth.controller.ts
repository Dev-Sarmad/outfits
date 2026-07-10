import type { Request, Response, NextFunction } from "express";
import { loginUserService, registerUserService } from "./auth.service.ts";
import { ApiResponse } from "../../shared/responses/ApiResponse.ts";
const register = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUserService(request.body);
    return response
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user));
  } catch (error) {
    next(error);
  }
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken, safeUser } = await loginUserService(
      request.body,
    );
    return response
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json(new ApiResponse(200, "User Logged In", { accessToken, safeUser }));
  } catch (error) {
    next(error);
  }
};

export { register, login };
