import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";
import generateToken from "../utils/generateToken.js"; // Assuming you have this utility function

// Book an appointment (for logged-in users)
const bookAppointment = asyncHandler(async (req, res) => {
  const { petId, doctorId, appointmentDate, query } = req.body;

  // Check if all required fields are provided
  if (!petId || !doctorId || !appointmentDate) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields (petId, doctorId, appointmentDate).",
    });
  }

  // Create the new appointment
  const appointment = new Appointment({
    petOwner: req.user._id, // Get the logged-in user from the request
    pet: petId,
    doctor: doctorId,
    appointmentDate,
    query,
    status: "Pending", // Initially set status to 'Pending'
    doctorResponse: "Pending", // Initially set doctor's response to 'Pending'
  });

  // Save the appointment in the database
  const savedAppointment = await appointment.save();

  res.status(201).json({
    success: true,
    appointment: savedAppointment,
  });
});

// @desc    Get all appointments (Admin Only)
// @route   GET /api/appointments/all
// @access  Private/Admin
const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .populate("petOwner", "name email") // Fetch pet owner details
    .populate("pet", "name type breed age") // Fetch pet details
    .populate("doctor", "name specialization"); // Fetch doctor details

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

// Doctor Accept/Reject Appointment
const respondToAppointment = asyncHandler(async (req, res) => {
  const { appointmentId, response } = req.body; // response can be 'Accepted' or 'Rejected'

  // Validate response
  if (!["Accepted", "Rejected"].includes(response)) {
    return res.status(400).json({
      success: false,
      message: "Invalid response. It should be 'Accepted' or 'Rejected'.",
    });
  }

  // Find the appointment by ID and update it
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found.",
    });
  }

  // Ensure the logged-in doctor is the one being assigned to this appointment
  if (appointment.doctor.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to respond to this appointment.",
    });
  }

  // Update the appointment based on doctor's response
  appointment.doctorResponse = response;

  if (response === "Accepted") {
    appointment.status = "Accepted";
  } else if (response === "Rejected") {
    appointment.status = "Rejected";
  }

  // Save the updated appointment
  const updatedAppointment = await appointment.save();

  res.status(200).json({
    success: true,
    appointment: updatedAppointment,
  });
});

export { bookAppointment, getAllAppointments, respondToAppointment };
