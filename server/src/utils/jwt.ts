import jwt from "jsonwebtoken";
import type { IUser } from "../modules/auth/auth.schema.ts";
import { config } from "../config/config.ts";

const generateAccessAndRefreshToken = async  (user: IUser) => {
  const refreshToken = jwt.sign({ _id: user._id, role: user.role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.REFRESH_EXPIRES_IN,
  });
  user.refreshToken = refreshToken;
  await user.save();
  const accessToken = jwt.sign({ _id: user._id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export { generateAccessAndRefreshToken };
