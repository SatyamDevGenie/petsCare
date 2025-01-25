import express from "express";
import { createService } from "../controllers/serviceController.js"; // Importing the createService function
import { protect, admin } from "../middlewares/authMiddleware.js"; // Middleware to protect routes and ensure Admin access

const router = express.Router();

// @route   POST /api/services
// @desc    Create a new service
// @access  Private/Admin
router.post("/create", protect, admin, createService); // Protect the route and allow only Admins

export default router;
