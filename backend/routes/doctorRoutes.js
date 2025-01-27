// routes/doctorRoutes.js
import express from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctorById,
} from "../controllers/doctorController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes
router.post("/create", protect, admin, createDoctor);
router.put("/:id", protect, admin, updateDoctor);
router.delete("/:id", protect, admin, deleteDoctor);

// Public routes (logged-in users only)
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);

export default router;
