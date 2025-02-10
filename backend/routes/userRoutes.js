import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  adminLogin,  // Assuming you have created this controller method
  doctorLogin
} from "../controllers/userController.js";
import { protect} from "../middlewares/authMiddleware.js"; // Adding admin middleware

const router = express.Router();

// Public Routes
router.route("/register").post(registerUser); // Register a new user
router.route("/login").post(loginUser); // User login
router.route("/logout").post(logoutUser); // Logout user

// Admin Routes
router.route("/admin/login").post(adminLogin); // Admin login

// Protected Routes (Require Authentication)
router.route("/profile")
  .get(protect, getUserProfile) // Get user profile (for authenticated users)
  .put(protect, updateUserProfile); // Update user profile (for authenticated users)


  // router.post("/doctorLogin", doctorLogin); // Doctor login route
  router.route("/doctorLogin").post(doctorLogin)




export default router;



