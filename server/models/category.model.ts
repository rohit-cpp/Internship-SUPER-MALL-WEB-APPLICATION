import mongoose, { Document, Schema } from "mongoose";

export interface ICategory {
  name: string;
  description?: string;
}

export interface ICategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      default: "",
      maxlength: 255,
      trim: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1 });

export default mongoose.model<ICategoryDocument>("Category", categorySchema);
