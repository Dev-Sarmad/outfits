import jwt from "jsonwebtoken";
import type { IUser } from "../modules/auth/auth.schema.ts";
import { config } from "../config/config.ts";

const generateToken = (user: IUser) => {
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRES_IN });
  return token;
  
};

export { generateToken };
