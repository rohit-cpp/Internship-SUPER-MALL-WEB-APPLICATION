import express from "express";
import {
  createOffer,
  getAllOffers,
  getOffersByShop,
  updateOffer,
  deleteOffer,
} from "../controllers/offer.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/", isAuthenticated, createOffer);
router.get("/", getAllOffers);
router.get("/shop/:shopId", getOffersByShop);
router.put("/:id", isAuthenticated, updateOffer);
router.delete("/:id", isAuthenticated, deleteOffer);

export default router;
