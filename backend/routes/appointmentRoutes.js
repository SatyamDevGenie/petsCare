import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getUserAppointments,
  respondToAppointment,
  getDoctorAppointments
} from "../controllers/appointmentController.js";
import { protect, admin, doctor} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for pet owners to book an appointment
router.post("/book", protect, bookAppointment);

// Route for admin to get all appointments
router.get("/all", protect, admin, getAllAppointments);

// Route for pet owners to get their appointments
router.get("/usersAppointments", protect, getUserAppointments);

// Route for doctors to accept or reject appointments
router.get("/doctorsAppointments", protect, doctor, getDoctorAppointments);

// Route for doctors to accept or reject appointments
router.put("/respond", protect, doctor, respondToAppointment);

export default router;





