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
 * @access Public
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
 * @desc Admin Login
 * @route POST /api/users/admin/login
 * @access Public
 */
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    if (!admin.isAdmin) {
      res.status(401);
      throw new Error("Not authorized as admin");
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc Logout user
 * @route POST /api/users/logout
 * @access Public
 */
const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Optionally clear any cookies or headers here if using them for authentication.
    res.status(200).json({
      statusCode: 200,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
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

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Update user fields
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      // Save updated user to database
      const updatedUser = await user.save();

      // Respond with updated user data and status code
      res.status(200).json({
        statusCode: 200,
        message: "User profile updated successfully",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});

export { registerUser, loginUser, adminLogin, logoutUser, getUserProfile, updateUserProfile };









// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";
// import generateToken from "../utils/generateToken.js"; // Assuming you have this utility function

// /**
//  * @desc Register new user
//  * @route POST /api/users/register
//  * @access Public
//  */
// const registerUser = asyncHandler(async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       res.status(400);
//       throw new Error("User already exists");
//     }

//     const user = await User.create({ name, email, password });

//     if (user) {
//       res.status(201).json({
//         success: true,
//         code: 201,
//         message: "User registered successfully",
//         data: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           token: generateToken(user._id),
//         },
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid user data");
//     }
//   } catch (error) {
//     res.status(res.statusCode || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// /**
//  * @desc Auth user
//  * @route POST /api/users/login
//  * @access Public
//  */
// const loginUser = asyncHandler(async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.status(200).json({
//         statusCode: 200,
//         message: "Login successful",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           token: generateToken(user._id),
//         },
//       });
//     } else {
//       res.status(401).json({
//         statusCode: 401,
//         message: "Invalid email or password",
//       });
//     }
//   } catch (error) {
//     res.status(res.statusCode || 500).json({
//       statusCode: res.statusCode || 500,
//       message: error.message,
//     });
//   }
// });



// /**
//  * @desc Logout user
//  * @route POST /api/users/logout
//  * @access Public
//  */
// const logoutUser = asyncHandler(async (req, res) => {
//   try {
//     // Optionally clear any cookies or headers here if using them for authentication.
//     res.status(200).json({
//       statusCode: 200,
//       message: "Logout successful",
//     });
//   } catch (error) {
//     res.status(500).json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });




// /**
//  * @desc Get user profile
//  * @route GET /api/users/profile
//  * @access Private
//  */
// const getUserProfile = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       res.status(200).json({
//         statusCode: 200,
//         message: "User profile retrieved successfully",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//         },
//       });
//     } else {
//       res.status(404).json({
//         statusCode: 404,
//         message: "User not found",
//       });
//     }
//   } catch (error) {
//     res.status(res.statusCode || 500).json({
//       statusCode: res.statusCode || 500,
//       message: error.message,
//     });
//   }
// });

// /**
//  * @desc Update user profile
//  * @route PUT /api/users/profile
//  * @access Private
//  */
// const updateUserProfile = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       // Update user fields
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//       // Save updated user to database
//       const updatedUser = await user.save();

//       // Respond with updated user data and status code
//       res.status(200).json({
//         statusCode: 200,
//         message: "User profile updated successfully",
//         user: {
//           _id: updatedUser._id,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           isAdmin: updatedUser.isAdmin,
//         },
//         token: generateToken(updatedUser._id),
//       });
//     } else {
//       res.status(404).json({
//         statusCode: 404,
//         message: "User not found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });



// export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile};










