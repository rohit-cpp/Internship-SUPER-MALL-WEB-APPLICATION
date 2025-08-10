import { Request, Response } from "express";
import { Floor } from "../models/floor.model";

export const createFloor = async (req: Request, res: Response) => {
  try {
    const { floorNumber, description } = req.body;
    const existing = await Floor.findOne({ floorNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: "Floor already exists" });
    }
    const floor = await Floor.create({ floorNumber, description });
    res.status(201).json({ success: true, floor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllFloors = async (_: Request, res: Response) => {
  try {
    const floors = await Floor.find().sort({ floorNumber: 1 });
    res.status(200).json({ success: true, floors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateFloor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { floorNumber, description } = req.body;
    const floor = await Floor.findByIdAndUpdate(id, { floorNumber, description }, { new: true });
    if (!floor) return res.status(404).json({ success: false, message: "Floor not found" });
    res.status(200).json({ success: true, floor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteFloor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Floor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Floor deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
