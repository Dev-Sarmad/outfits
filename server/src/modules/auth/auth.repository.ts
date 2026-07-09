import { User } from "./auth.schema.ts";
import type { RegisterUserInput } from "./auth.validation.ts";

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findUserById = async (id: string) => {
  return await User.findById(id);
};

const registerUser = async (data:RegisterUserInput) => {
    return await User.create(data);
};

export { findUserByEmail, findUserById, registerUser };
