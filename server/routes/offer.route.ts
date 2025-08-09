import express from "express";
import { createOffer, listOffers } from "../controllers/offer.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Create offer (admin only)
// POST /api/v1/offers
router.post("/", protectAdmin, createOffer);

// List active offers
// GET /api/v1/offers
router.get("/", listOffers);

export default router;
