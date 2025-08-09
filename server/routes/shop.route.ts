import express from "express";
import {
  createShop,
  updateShop,
  listShops,
  getShopDetails
} from "../controllers/shop.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Create shop (admin only)
// POST /api/v1/shops
router.post("/", protectAdmin, createShop);

// Update shop by ID (admin only)
// PUT /api/v1/shops/:id
router.put("/:id", protectAdmin, updateShop);

// List shops (optional filters: ?category=&floor=)
// GET /api/v1/shops
router.get("/", listShops);

// Get shop details
// GET /api/v1/shops/:id
router.get("/:id", getShopDetails);

export default router;
