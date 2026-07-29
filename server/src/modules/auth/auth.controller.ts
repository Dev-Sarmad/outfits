import type { Request, Response, NextFunction } from "express";
import {
  loginUserService,
  logoutService,
  registerUserService,
} from "./auth.service.ts";
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
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json(new ApiResponse(200, "User Logged In", { safeUser }));
  } catch (error) {
    next(error);
  }
};

const logout = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    await logoutService(request.cookies.accessToken);
    response.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return new ApiResponse(200, "logout successfull", {
      message: "User successfully looggedout",
    });
  } catch (error) {
    next(error);
  }
};
export { register, login, logout };
