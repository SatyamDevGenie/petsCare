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

// Create a new pet
router.post("/create", protect, admin, createPet);

// Get all pets for a user
router.get("/", getPets);              // remove protect - middleware

// Get a single pet by ID
router.get("/:id", getPetById);

// Update a pet
router.put("/:id", protect, updatePet);

// Delete a pet
router.delete("/:id", protect, deletePet);

// Get vaccination records for a pet
router.get("/:id/vaccination-records", getVaccinationRecords);

export default router;
