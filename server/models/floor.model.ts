import mongoose, { Document } from "mongoose";

export interface IFloor {
  floorNumber: number;
  description?: string;
}

export interface IFloorDocument extends IFloor, Document {
  createdAt: Date;
  updatedAt: Date;
}

const floorSchema = new mongoose.Schema<IFloorDocument>(
  {
    floorNumber: { type: Number, required: true, unique: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Floor = mongoose.model<IFloorDocument>("Floor", floorSchema);
