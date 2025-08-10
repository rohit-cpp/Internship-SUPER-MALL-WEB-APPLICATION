import mongoose, { Document } from "mongoose";

export interface IShop {
  name: string;
  owner: mongoose.Types.ObjectId; // Ref to User
  category: mongoose.Types.ObjectId; // Ref to Category
  floor: mongoose.Types.ObjectId; // Ref to Floor
  description?: string;
  address: string;
  contact: string;
  image?: string;
}

export interface IShopDocument extends IShop, Document {
  createdAt: Date;
  updatedAt: Date;
}

const shopSchema = new mongoose.Schema<IShopDocument>(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    floor: { type: mongoose.Schema.Types.ObjectId, ref: "Floor", required: true },
    description: { type: String, default: "" },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Shop = mongoose.model<IShopDocument>("Shop", shopSchema);
