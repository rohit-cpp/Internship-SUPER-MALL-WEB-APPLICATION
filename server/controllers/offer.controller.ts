import { Request, Response } from "express";
import Offer from "../models/offer.model";

// CREATE OFFER
export const createOffer = async (req: Request, res: Response) => {
  try {
    const { title, discount, validFrom, validTo, description } = req.body;
    if (!title || discount == null || !validFrom || !validTo) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const offer = await Offer.create({ title, discount, validFrom, validTo, description });
    return res.status(201).json({ success: true, offer });
  } catch (err) {
    console.error("createOffer:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LIST CURRENT OFFERS
export const listOffers = async (_: Request, res: Response) => {
  try {
    const now = new Date();
    const offers = await Offer.find({ validTo: { $gte: now } });
    return res.status(200).json({ success: true, offers });
  } catch (err) {
    console.error("listOffers:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
