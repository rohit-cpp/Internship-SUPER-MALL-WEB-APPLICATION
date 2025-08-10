import { Request, Response } from "express";
import { Shop } from "../models/shop.model";
import { User } from "../models/user.model"; // for owner check

export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, owner, category, floor, description, address, contact, image } = req.body;
    // Optional: Check if owner exists
    const shop = await Shop.create({ name, owner, category, floor, description, address, contact, image });
    res.status(201).json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllShops = async (_: Request, res: Response) => {
  try {
    const shops = await Shop.find()
      .populate("owner", "-password")
      .populate("category")
      .populate("floor")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, shops });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getShopById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id)
      .populate("owner", "-password")
      .populate("category")
      .populate("floor");
    if (!shop) return res.status(404).json({ success: false, message: "Shop not found" });
    res.status(200).json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const shop = await Shop.findByIdAndUpdate(id, updates, { new: true });
    if (!shop) return res.status(404).json({ success: false, message: "Shop not found" });
    res.status(200).json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteShop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Shop deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
