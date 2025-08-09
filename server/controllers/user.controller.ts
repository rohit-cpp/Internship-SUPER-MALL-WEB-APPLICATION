import { Request, Response } from "express";
import User from "../models/user.model";

// LIST ALL USERS
export const listUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("listUsers:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET CURRENT USER (via isAuthenticated middleware)
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("getCurrentUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE USER PROFILE
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updates = (({ fullname, email, address, city, country, profilePicture }) => 
                     ({ fullname, email, address, city, country, profilePicture }))(req.body);
    const user = await User.findByIdAndUpdate(req.id, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("updateProfile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
