import jwt from "jsonwebtoken";
import type { IUser } from "../modules/auth/auth.schema.ts";
import { config } from "../config/config.ts";
import type { HydratedDocument } from "mongoose";
type UserDocument =  HydratedDocument<IUser>;
const generateAccessAndRefreshToken = async  (user: UserDocument) => {
  const refreshToken = jwt.sign({ userId: user._id.toString(), role: user.role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.REFRESH_EXPIRES_IN,
  });
  user.refreshToken = refreshToken;
  await user.save();
  const accessToken = jwt.sign({ userId: user._id.toString(), role: user.role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export { generateAccessAndRefreshToken };
