import { Request, Response } from "express";
import Admin from "../models/admin.model";

// CREATE NEW ADMIN
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(409).json({ message: "Username already taken" });
    }
    const admin = await Admin.create({ username, password });
    return res.status(201).json({ success: true, admin });
  } catch (err) {
    console.error("createAdmin:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LIST ADMINS
export const listAdmins = async (_: Request, res: Response) => {
  try {
    const admins = await Admin.find().select("-password");
    return res.status(200).json({ success: true, admins });
  } catch (err) {
    console.error("listAdmins:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
