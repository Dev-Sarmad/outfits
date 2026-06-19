import { ApiResponse } from "../../shared/responses/ApiResponse.ts";
import { findUserByEmail, registerUser } from "./auth.repository.ts";
import { hashPassword } from "../../utils/hash.ts";

export const registerUserService = async (data) => {

  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new ApiResponse(409, "User already exists", existingUser.email);
  }
  data.password = await hashPassword(data.password);

  const user = await registerUser(data);
  return new ApiResponse(201, "User registered successfully", user);

};
