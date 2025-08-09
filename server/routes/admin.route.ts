import express from "express";
import { createAdmin, listAdmins } from "../controllers/admin.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Create new admin (protected)
// POST /api/v1/admin
router.post("/", protectAdmin, createAdmin);

// List all admins (protected)
// GET /api/v1/admin
router.get("/", protectAdmin, listAdmins);

export default router;
