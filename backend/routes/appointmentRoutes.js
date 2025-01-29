import express from "express";
import { bookAppointment, getAllAppointments } from "../controllers/appointmentController.js";
import { protect, admin} from "../middlewares/authMiddleware.js";


const router = express.Router();


// Route for users to book an appointment
router.post('/book', protect, bookAppointment);

// Route for admin to get all appointments
router.get("/all", protect, admin, getAllAppointments);


export default router;