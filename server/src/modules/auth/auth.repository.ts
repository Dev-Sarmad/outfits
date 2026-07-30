import { User } from "./auth.schema.ts";
import type { RegisterUserInput } from "./auth.validation.ts";

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findUserById = async (id: string) => {
  return await User.findById(id).select("-password").lean();
};

const clearRefreshToken =async(id:string)=>{
  await User.findByIdAndUpdate(id, {
    refreshToken:null
  })
}

const registerUser = async (data:RegisterUserInput) => {
    return await User.create(data);
};

export { findUserByEmail, findUserById, registerUser,clearRefreshToken };
