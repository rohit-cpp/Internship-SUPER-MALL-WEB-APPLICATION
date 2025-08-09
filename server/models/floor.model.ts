import mongoose, { Document, Schema } from "mongoose";

export interface IFloor {
  number: number;
  name?: string;
  description?: string;
}

export interface IFloorDocument extends IFloor, Document {
  createdAt: Date;
  updatedAt: Date;
}

const floorSchema = new Schema<IFloorDocument>(
  {
    number: {
      type: Number,
      required: [true, "Floor number is required"],
      unique: true,
      min: 0,
    },
    name: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

floorSchema.index({ number: 1 });

export default mongoose.model<IFloorDocument>("Floor", floorSchema);
