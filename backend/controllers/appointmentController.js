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
  });

  // Save the appointment in the database
  const savedAppointment = await appointment.save();

  res.status(201).json({
    success: true,
    appointment: savedAppointment,
  });
});

export { bookAppointment };
