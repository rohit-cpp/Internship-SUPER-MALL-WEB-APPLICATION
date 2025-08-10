import mongoose, { Document } from "mongoose";

export interface ICategory {
  name: string;
  description?: string;
}

export interface ICategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategoryDocument>("Category", categorySchema);
