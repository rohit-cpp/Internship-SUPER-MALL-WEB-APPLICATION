import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// CRUD for Admin only; listing for all.
router.post("/", isAuthenticated, createCategory);
router.get("/", getAllCategories);
router.put("/:id", isAuthenticated, updateCategory);
router.delete("/:id", isAuthenticated, deleteCategory);

export default router;
