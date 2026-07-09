import mongoose, { Types } from "mongoose";
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  age?: number;
  refreshToken?: string | null;
  isVerified: boolean;
}
const userschema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer"
    },
    refreshToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userschema);
