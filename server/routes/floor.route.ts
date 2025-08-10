import express from "express";
import {
  createFloor,
  getAllFloors,
  updateFloor,
  deleteFloor,
} from "../controllers/floor.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/", isAuthenticated, createFloor);
router.get("/", getAllFloors);
router.put("/:id", isAuthenticated, updateFloor);
router.delete("/:id", isAuthenticated, deleteFloor);

export default router;
