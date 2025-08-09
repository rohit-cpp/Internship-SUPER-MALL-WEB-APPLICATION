import { Request, Response } from "express";
import Floor from "../models/floor.model";

// CREATE FLOOR
export const createFloor = async (req: Request, res: Response) => {
  try {
    const { number, name, description } = req.body;
    if (number === undefined) return res.status(400).json({ message: "Number is required" });
    const exists = await Floor.findOne({ number });
    if (exists) return res.status(409).json({ message: "Floor number exists" });
    const floor = await Floor.create({ number, name, description });
    return res.status(201).json({ success: true, floor });
  } catch (err) {
    console.error("createFloor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LIST FLOORS
export const listFloors = async (_: Request, res: Response) => {
  try {
    const floors = await Floor.find().sort("number");
    return res.status(200).json({ success: true, floors });
  } catch (err) {
    console.error("listFloors:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
