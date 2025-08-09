import { Request, Response } from "express";
import Product from "../models/product.model";

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { shop, name, price, features, description, images, stock, offer } = req.body;
    const product = await Product.create({
      shop, name, price, features, description, images, stock, offer
    });
    return res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("createProduct:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LIST PRODUCTS (FILTERABLE)
export const listProducts = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.shop)  filter.shop = req.query.shop;
    if (req.query.offer) filter.offer = req.query.offer;
    const products = await Product.find(filter);
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("listProducts:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// COMPARE PRODUCTS
export const compareProducts = async (req: Request, res: Response) => {
  try {
    if (!req.query.ids) {
      return res.status(400).json({ message: "Product IDs required" });
    }
    const ids = (req.query.ids as string).split(",");
    const products = await Product.find({ _id: { $in: ids } });
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("compareProducts:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
