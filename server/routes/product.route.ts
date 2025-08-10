import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  compareProducts,
  filterProducts,
} from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/", isAuthenticated, createProduct);
router.get("/", getAllProducts);
router.get("/filter", filterProducts); // e.g., /api/v2/product/filter?shop=xxx&category=yyy
router.get("/:id", getProductById);
router.put("/:id", isAuthenticated, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

router.post("/compare", compareProducts); // Pass array of IDs in body

export default router;
