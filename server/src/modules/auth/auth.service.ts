import { findUserByEmail, registerUser } from "./auth.repository.ts";
import { comparePassword, hashPassword } from "../../utils/hash.ts";
import type { LoginUserInput, RegisterUserInput } from "./auth.validation.ts";
import { ApiError } from "../../shared/errors/ApiError.ts";
import { generateAccessAndRefreshToken } from "../../utils/jwt.ts";

export const registerUserService = async (data: RegisterUserInput) => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new ApiError(409, "User registration falied", [
      "A user with this email already exists",
    ]);
  }
  data.password = await hashPassword(data.password);

  const user = await registerUser(data);
  return user;
};

export const loginUserService = async (data: LoginUserInput) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new ApiError(404, "User not found", [
      "User with this email not found",
    ]);
  }
  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials", ["Password is incorrect"]);
  }
  const { accessToken , refreshToken} = await generateAccessAndRefreshToken(user);

  const { password, refreshToken:_, ...safeUser } = user.toObject();

  return { accessToken, refreshToken, safeUser };
};
