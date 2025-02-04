import express from "express";
import { bookAppointment, getAllAppointments, respondToAppointment } from "../controllers/appointmentController.js";
import { protect, admin} from "../middlewares/authMiddleware.js";


const router = express.Router();


// Route for users to book an appointment
router.post('/book', protect, bookAppointment);

// Route for doctors to accept or reject appointments
router.put('/respond', protect, respondToAppointment);

// Route for admin to get all appointments
router.get("/all", protect, admin, getAllAppointments);


export default router;