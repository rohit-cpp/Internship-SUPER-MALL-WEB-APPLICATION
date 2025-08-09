import mongoose, { Document, Schema } from "mongoose";

export interface IOffer {
  title: string;
  description?: string;
  discount: number;
  validFrom: Date;
  validTo: Date;
}

export interface IOfferDocument extends IOffer, Document {
  createdAt: Date;
  updatedAt: Date;
  isActive(): boolean;
}

const offerSchema = new Schema<IOfferDocument>(
  {
    title: {
      type: String,
      required: [true, "Offer title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
      maxlength: 500,
      trim: true,
    },
    discount: {
      type: Number,
      required: [true, "Discount percentage is required"],
      min: 0,
      max: 100,
    },
    validFrom: {
      type: Date,
      required: [true, "Start date is required"],
    },
    validTo: {
      type: Date,
      required: [true, "End date is required"],
    },
  },
  { timestamps: true }
);

// Instance method to check if offer is currently active
offerSchema.methods.isActive = function () {
  const now = new Date();
  return now >= this.validFrom && now <= this.validTo;
};

offerSchema.index({ validTo: 1 });

export default mongoose.model<IOfferDocument>("Offer", offerSchema);
