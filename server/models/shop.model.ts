import mongoose, { Document, Schema } from "mongoose";

export interface IShop {
  name: string;
  category: mongoose.Types.ObjectId;
  floor: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface IShopDocument extends IShop, Document {
  createdAt: Date;
  updatedAt: Date;
}

const shopSchema = new Schema<IShopDocument>(
  {
    name: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
      maxlength: 100,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
    },
    floor: {
      type: Schema.Types.ObjectId,
      ref: "Floor",
      required: [true, "Floor reference is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner (User) is required"],
    },
    description: {
      type: String,
      default: "",
      maxlength: 500,
      trim: true,
    },
    location: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
  },
  { timestamps: true }
);

// Populate references for queries
shopSchema.pre(/^find/, function (next) {
  const query = this as mongoose.Query<any, any>;
  query.populate("category", "name")
    .populate("floor", "number name")
    .populate("owner", "fullname email");
  next();
});

export default mongoose.model<IShopDocument>("Shop", shopSchema);
