import express from "express";
import { createFloor, listFloors } from "../controllers/floor.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Create a floor (admin only)
// POST /api/v1/floors
router.post("/", protectAdmin, createFloor);

// Get all floors
// GET /api/v1/floors
router.get("/", listFloors);

export default router;
