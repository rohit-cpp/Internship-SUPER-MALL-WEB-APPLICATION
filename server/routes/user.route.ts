import express from "express";
import {
  listUsers,
  getCurrentUser,
  updateProfile
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Check authentication & get current user
// GET /api/v1/user/me
router.get("/me", isAuthenticated, getCurrentUser);

// Update own profile
// PUT /api/v1/user/profile
router.put("/profile", isAuthenticated, updateProfile);

// List all users (admin only via JWT role check in middleware)
// GET /api/v1/user
router.get("/", isAuthenticated, listUsers);

export default router;
