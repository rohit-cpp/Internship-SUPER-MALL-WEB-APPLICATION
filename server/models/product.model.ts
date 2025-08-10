import mongoose, { Document } from "mongoose";

export interface IProduct {
  name: string;
  description?: string;
  price: number;
  features?: string[];
  shop: mongoose.Types.ObjectId; // Ref to Shop
  category: mongoose.Types.ObjectId; // Ref to Category
  image?: string;
}

export interface IProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    features: [{ type: String }],
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProductDocument>("Product", productSchema);
