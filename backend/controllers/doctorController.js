import asyncHandler from "express-async-handler";
import Doctor from "../models/doctorModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// @desc    Create a new doctor (Admin only)
// @route   POST /api/doctors/create
// @access  Private/Admin
const createDoctor = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, specialization, contactNumber, notes, availability } = req.body;

    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
      specialization,
      contactNumber,
      notes,
      availability,
      isDoctor: true, // Ensure the user is a doctor
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
      error: error.message,
    });
  }
});

// @desc    Update a doctor (Admin only)
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = asyncHandler(async (req, res) => {
  try {
    const { name, email, specialization, contactNumber, profileImage, notes } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.specialization = specialization || doctor.specialization;
    doctor.contactNumber = contactNumber || doctor.contactNumber;
    doctor.profileImage = profileImage || doctor.profileImage;
    doctor.notes = notes || doctor.notes;

    const updatedDoctor = await doctor.save();

    res.json({
      success: true,
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update doctor",
      error: error.message,
    });
  }
});

// @desc    Delete a doctor (Admin only)
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
});

// @desc    Get all doctors (Public)
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password"); // Exclude password
    res.json({
      success: true,
      message: "Doctors retrieved successfully",
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors",
      error: error.message,
    });
  }
});

// @desc    Get a single doctor by ID (Public)
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor retrieved successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor",
      error: error.message,
    });
  }
});

// @desc    Doctor Login
// @route   POST /api/doctors/login
// @access  Public
const doctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the doctor by email
  const doctor = await Doctor.findOne({ email });

  // Check if doctor exists and verify password
  if (doctor && (await bcrypt.compare(password, doctor.password))) {
    if (!doctor.isDoctor) {
      return res.status(401).json({
        success: false,
        message: "Not authorized as a doctor",
      });
    }

    res.json({
      success: true,
      message: "Doctor logged in successfully",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        contactNumber: doctor.contactNumber,
        profileImage: doctor.profileImage,
        isDoctor: doctor.isDoctor,
        token: generateToken(doctor._id), // JWT token for authentication
      },
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

export { createDoctor, updateDoctor, deleteDoctor, getDoctors, getDoctorById, doctorLogin };









