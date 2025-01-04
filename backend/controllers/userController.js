import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"; // Assuming you have this utility function

/**
 * @desc Register new user
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        success: true,
        code: 201,
        message: "User registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
});


/**
 * @desc Auth user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        statusCode: 401,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({
      statusCode: res.statusCode || 500,
      message: error.message,
    });
  }
});


/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        statusCode: 200,
        message: "User profile retrieved successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({
      statusCode: res.statusCode || 500,
      message: error.message,
    });
  }
});




export { registerUser, loginUser, getUserProfile };
