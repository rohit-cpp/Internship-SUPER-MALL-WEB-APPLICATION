import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, features, shop, category, image } = req.body;
    const product = await Product.create({ name, description, price, features, shop, category, image });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate("shop")
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("shop")
      .populate("category");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Compare products by price & features
export const compareProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; // array of product IDs
    const products = await Product.find({ _id: { $in: ids } }).populate("shop").populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Filter products by shop or category
export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { shop, category } = req.query;
    let filter: any = {};
    if (shop) filter.shop = shop;
    if (category) filter.category = category;
    const products = await Product.find(filter).populate("shop").populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
