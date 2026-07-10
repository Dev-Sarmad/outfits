import { IUser } from "../src/modules/auth/auth.schema.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}