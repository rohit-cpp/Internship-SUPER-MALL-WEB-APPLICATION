import express from "express";
import { createCategory, listCategories } from "../controllers/category.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Create a category (admin only)
// POST /api/v1/categories
router.post("/", protectAdmin, createCategory);

// Get all categories
// GET /api/v1/categories
router.get("/", listCategories);

export default router;
