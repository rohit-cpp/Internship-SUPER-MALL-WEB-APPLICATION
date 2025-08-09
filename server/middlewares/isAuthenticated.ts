import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to add `id` property
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("[isAuthenticated] Checking for token in cookies...");

    const token = req.cookies?.token;

    if (!token) {
    //   console.warn("[isAuthenticated] No token found.");
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const secret = process.env.SECRET_KEY;

    if (!secret) {
    //   console.error("[isAuthenticated] SECRET_KEY is not set in environment variables.");
      return res.status(500).json({
        success: false,
        message: "Internal server error (missing secret)",
      });
    }

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    if (!decoded || !decoded.userId) {
    //   console.warn("[isAuthenticated] Invalid or malformed token.");
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // console.log(`[isAuthenticated] Token verified. User ID: ${decoded.userId}`);

    req.id = decoded.userId;
    next();

  } catch (error: any) {
    // console.error("[isAuthenticated] Error verifying token:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
