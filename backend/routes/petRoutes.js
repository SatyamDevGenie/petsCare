import express from "express";
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
  getVaccinationRecords,
} from "../controllers/petController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only routes
router.post("/create", protect, admin, createPet); // Admin can create a pet
router.put("/:id", protect, admin, updatePet);    // Admin can update a pet
router.delete("/:id", protect, admin, deletePet); // Admin can delete a pet

// Public routes (or logged-in users if protect is needed)
router.get("/", getPets);                         // Get all pets (public)
router.get("/:id", getPetById);                   // Get a single pet by ID (public)
router.get("/:id/vaccination-records", protect, admin,  getVaccinationRecords); // Vaccination records (public)

export default router;
