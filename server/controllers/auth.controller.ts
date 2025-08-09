import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Admin from "../models/admin.model";
import { generateToken } from "../utlis/generateToken";


// USER SIGNUP
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const user = await User.create({ fullname, email, password, contact });
    generateToken(res, user);
    return res.status(201).json({ success: true, user });
  } catch (err) {
    console.error("userSignup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// USER LOGIN
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    user.lastLogin = new Date();
    await user.save();
    generateToken(res, user);
    return res.status(200).json({ success: true, user: user.toObject({ getters: true, virtuals: true }) });
  } catch (err) {
    console.error("userLogin:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ADMIN LOGIN
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("adminLogin:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
