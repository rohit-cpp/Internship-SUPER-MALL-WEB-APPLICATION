import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Admin from "../models/admin.model";
import User from "../models/user.model.js";

// Extract token from header or cookie
const extractToken = (req: Request): string | null => {
  // Prefer Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  // Fallback to cookie
  return req.cookies?.token || null;
};

// Protect admin routes by verifying JWT and role
export const protectAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: "Admin token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role?: string };
    // Verify role
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }
    // Attach admin user to request
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid admin token" });
    }
    req.user = { ...admin.toObject(), _id: admin._id.toString() }; // ensure _id is a string
    next();
  } catch (err) {
    console.error("protectAdmin error:", err);
    return res.status(401).json({ success: false, message: "Admin authentication failed" });
  }
};

// Protect user routes by verifying JWT
export const protectUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: "User token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user token" });
    }
    req.user = { ...user.toObject(), _id: user._id.toString() }; // ensure _id is a string
    next();
  } catch (err) {
    console.error("protectUser error:", err);
    return res.status(401).json({ success: false, message: "User authentication failed" });
  }
};
