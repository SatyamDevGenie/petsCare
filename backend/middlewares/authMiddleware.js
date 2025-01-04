
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token found. Authorization denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found. Invalid token." });
    }

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ success: false, message: "Not authorized. Invalid token." });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied. Admin privileges required." });
  }
};

export { protect, admin };