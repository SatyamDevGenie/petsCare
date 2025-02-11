import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

// Middleware to protect routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  // Check if token is provided in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found. Authorization denied.",
    });
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the request object
    req.user = await Doctor.findById(decoded.id).select("-password");
    if (!req.user) {
      req.user = await User.findById(decoded.id).select("-password");
    }


    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Invalid token.",
      });
    }

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid or expired token.",
    });
  }
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

// Middleware to check if the user is an doctor
const doctor = (req, res, next) => {
  if (req.user && req.user.isDoctor) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied, Doctor privileges required",
    });
  }
};

export { protect, admin, doctor };
