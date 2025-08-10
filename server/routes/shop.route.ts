import express from "express";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} from "../controllers/shop.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/", isAuthenticated, createShop);    // Create shop
router.get("/", getAllShops);                     // List all shops
router.get("/:id", getShopById);                  // Get shop by id
router.put("/:id", isAuthenticated, updateShop);  // Update shop
router.delete("/:id", isAuthenticated, deleteShop); // Delete shop

export default router;
