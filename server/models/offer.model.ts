import mongoose, { Document } from "mongoose";

export interface IOffer {
  title: string;
  description?: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  shop: mongoose.Types.ObjectId; // Ref to Shop
}

export interface IOfferDocument extends IOffer, Document {
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new mongoose.Schema<IOfferDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    discountPercentage: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true }
);

export const Offer = mongoose.model<IOfferDocument>("Offer", offerSchema);
