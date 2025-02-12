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





// Doctor Accept/Reject Appointment
const respondToAppointment = asyncHandler(async (req, res) => {
  try {
    const { appointmentId, response } = req.body;

    // Validate response type
    if (!["Accepted", "Rejected"].includes(response)) {
      return res.status(400).json({
        success: false,
        message: "Response must be either 'Accepted' or 'Rejected'.",
      });
    }

    // Find appointment by ID
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    // Ensure the request contains a valid doctor object
    if (!req.doctor || !req.doctor._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Doctor credentials required.",
      });
    }

    // Ensure only the assigned doctor can respond
    if (appointment.doctor.toString() !== req.doctor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to respond to this appointment.",
      });
    }

    // Update appointment status
    appointment.doctorResponse = response;
    appointment.status = response;

    const updatedAppointment = await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment has been ${response.toLowerCase()} successfully.`,
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while responding to the appointment.",
      error: error.message,
    });
  }
});


export { bookAppointment, getAllAppointments, getUserAppointments, respondToAppointment };






