// routes/doctorRoutes.js
import express from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctorById,
  loginDoctor,
} from "../controllers/doctorController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes
router.post("/create", protect, admin, createDoctor);
router.put("/:id", protect, admin, updateDoctor);
router.delete("/:id", protect, admin, deleteDoctor);

// Public routes (logged-in users only)
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/login", loginDoctor)

export default router;
