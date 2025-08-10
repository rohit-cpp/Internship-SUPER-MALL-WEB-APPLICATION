import { Request, Response } from "express";
import { Offer } from "../models/offer.model";

export const createOffer = async (req: Request, res: Response) => {
  try {
    const { title, description, discountPercentage, startDate, endDate, shop } = req.body;
    const offer = await Offer.create({ title, description, discountPercentage, startDate, endDate, shop });
    res.status(201).json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllOffers = async (_: Request, res: Response) => {
  try {
    const offers = await Offer.find()
      .populate("shop")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// List current offers for a shop
export const getOffersByShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const offers = await Offer.find({ shop: shopId }).sort({ startDate: -1 });
    res.status(200).json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const offer = await Offer.findByIdAndUpdate(id, updates, { new: true });
    if (!offer) return res.status(404).json({ success: false, message: "Offer not found" });
    res.status(200).json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Offer.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Offer deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
