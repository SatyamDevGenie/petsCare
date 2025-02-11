import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";

// Book an appointment (Only petOwners can book)
const bookAppointment = asyncHandler(async (req, res) => {
  const { petId, doctorId, appointmentDate, query } = req.body;

  if (!petId || !doctorId || !appointmentDate) {
    return res.status(400).json({
      success: false,
      message: "Please provide petId, doctorId, and appointmentDate.",
    });
  }

  if (req.user.role !== "petOwner") {
    return res.status(403).json({
      success: false,
      message: "Only pet owners can book appointments.",
    });
  }

  const appointment = new Appointment({
    petOwner: req.user._id,
    pet: petId,
    doctor: doctorId,
    appointmentDate,
    query,
    status: "Pending",
    doctorResponse: "Pending",
  });

  const savedAppointment = await appointment.save();

  res.status(201).json({
    success: true,
    appointment: savedAppointment,
  });
});

// Get all appointments (Only Admin)
const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .populate("petOwner", "name email")
    .populate("pet", "name type breed age")
    .populate("doctor", "name specialization");

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});


// Get appointments for the logged-in petOwner
const getUserAppointments = asyncHandler(async (req, res) => {
  if (req.user.role !== "petOwner") {
    return res.status(403).json({
      success: false,
      message: "Only pet owners can view their appointments.",
    });
  }

  const appointments = await Appointment.find({ petOwner: req.user._id })
    .populate("pet", "name type breed age")
    .populate("doctor", "name specialization");

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

export {
  bookAppointment,
  getAllAppointments,
  getUserAppointments
};