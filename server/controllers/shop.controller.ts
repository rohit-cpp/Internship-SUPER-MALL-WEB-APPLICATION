import { Request, Response } from "express";
import Shop from "../models/shop.model";

// Extend Express Request to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        // add other user properties if needed
      };
    }
  }
}

// CREATE SHOP
export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, category, floor, description, location } = req.body;
    const shop = await Shop.create({
      name, category, floor, description, location, owner: req.user._id
    });
    return res.status(201).json({ success: true, shop });
  } catch (err) {
    console.error("createShop:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE SHOP
export const updateShop = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    return res.status(200).json({ success: true, shop });
  } catch (err) {
    console.error("updateShop:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LIST SHOPS (WITH FILTERS)
export const listShops = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.floor) filter.floor = req.query.floor;
    const shops = await Shop.find(filter);
    return res.status(200).json({ success: true, shops });
  } catch (err) {
    console.error("listShops:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET SHOP BY ID
export const getShopDetails = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    return res.status(200).json({ success: true, shop });
  } catch (err) {
    console.error("getShopDetails:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
