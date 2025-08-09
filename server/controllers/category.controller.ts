import { Request, Response } from "express";
import Category from "../models/category.model";

// CREATE CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ message: "Category exists" });
    const category = await Category.create({ name, description });
    return res.status(201).json({ success: true, category });
  } catch (err) {
    console.error("createCategory:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LIST CATEGORIES
export const listCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Category.find().sort("name");
    return res.status(200).json({ success: true, categories });
  } catch (err) {
    console.error("listCategories:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
