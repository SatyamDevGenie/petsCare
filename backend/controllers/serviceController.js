import asyncHandler from "express-async-handler";
import Service from "../models/serviceModel.js";
import generateToken from "../utils/generateToken.js"; // Assuming you have this utility function

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !price) {
      res.status(400);
      throw new Error("Please provide all fields");
    }

    // Create a new service document
    const service = new Service({
      title,
      description,
      price,
    });

    // Save the service to the database
    const createdService = await service.save();

    // Send response after successfully creating the service
    res.status(201).json({
      message: "Service created successfully by Admin", // Success message
      _id: createdService._id,
      title: createdService.title,
      description: createdService.description,
      price: createdService.price,
    });
  } catch (error) {
    // Catch any errors and send appropriate response
    res.status(500).json({
      message: error.message || "Something went wrong while creating the service",
    });
  }
});



// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
    try {
      // Fetch all services
      const services = await Service.find({});
  
      // Return success response
      res.status(200).json({
        message: "Services fetched successfully",
        services,
      });
    } catch (error) {
      // Catch and handle any errors
      res.status(500).json({
        message: error.message || "Something went wrong while fetching services",
      });
    }
  });




export { createService, getServices };
