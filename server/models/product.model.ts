import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  shop: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  features: string[];
  offer?: mongoose.Types.ObjectId;
  images: string[];
  stock: number;
}

export interface IProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
  discountedPrice?(): number;
}

const productSchema = new Schema<IProductDocument>(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: [true, "Shop reference is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      default: "",
      maxlength: 1000,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 20,
        message: "Maximum of 20 features allowed",
      },
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: "Offer",
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 10,
        message: "Maximum of 10 images allowed",
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Virtual: compute discounted price if offer applied
productSchema.virtual("discountedPrice").get(function () {
  if (this.offer && this.populated("offer")) {
    const discount = (this.offer as any).discount;
    return this.price * (1 - discount / 100);
  }
  return this.price;
});

// Auto-populate offer on find
productSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("offer", "title discount validTo");
  next();
});

export default mongoose.model<IProductDocument>("Product", productSchema);
