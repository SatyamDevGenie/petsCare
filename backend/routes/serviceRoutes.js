import express from "express";
import { createService, getServices, getSingleService } from "../controllers/serviceController.js"; // Importing functions from the controller
import { protect, admin } from "../middlewares/authMiddleware.js"; // Middleware to protect routes and ensure Admin access

const router = express.Router();

// @route   POST /api/services/create
// @desc    Create a new service
// @access  Private/Admin
router.post("/create", protect, admin, createService); // Protect the route and allow only Admins


// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get("/", getServices); // Public access to fetch all services


// @route   GET /api/services/:id
// @desc    Get a single service by ID
// @access  Public
router.get("/:id", getSingleService); // Public route for fetching a single service by ID


export default router;
