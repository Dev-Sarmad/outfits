import mongoose from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  createdBy: mongoose.Types.ObjectId;
}


const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min:0
    },
    stock: {
      type: Number,
      required: true,
      min:0
    },
    images: {
      type: [String],
      required:true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
