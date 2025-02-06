import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  respondToAppointment,
  getUserAppointments
} from "../controllers/appointmentController.js";
import { protect, admin, doctor } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for pet owners to book an appointment
router.post("/book", protect, bookAppointment);

// Route for doctors to accept or reject appointments
router.put("/respond", protect, doctor, respondToAppointment);

// Route for admin to get all appointments
router.get("/all", protect, admin, getAllAppointments);

router.get("/usersAppointments", protect, getUserAppointments); // Pet Owners Only

export default router;





