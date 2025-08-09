import express from "express";
import {
  createProduct,
  listProducts,
  compareProducts
} from "../controllers/product.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Create product (admin only)
// POST /api/v1/products
router.post("/", protectAdmin, createProduct);

// List products (filters: ?shop=&offer=)
// GET /api/v1/products
router.get("/", listProducts);

// Compare multiple products by comma-separated IDs
// GET /api/v1/products/compare?ids=id1,id2,...
router.get("/compare", compareProducts);

export default router;
