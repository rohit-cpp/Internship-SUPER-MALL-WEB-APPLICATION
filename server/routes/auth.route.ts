import express from "express";
import { userSignup, userLogin, adminLogin } from "../controllers/auth.controller.js";
// import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// User registration
// POST /api/v1/auth/signup
router.post("/signup", userSignup);

// User login
// POST /api/v1/auth/login
router.post("/login", userLogin);

// Admin login
// POST /api/v1/auth/admin/login
router.post("/admin/login", adminLogin);

export default router;
