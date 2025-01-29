import express from "express";
import { bookAppointment } from "../controllers/appointmentController.js";
import { protect} from "../middlewares/authMiddleware.js";


const router = express.Router();


// Route for users to book an appointment
router.post('/book', protect, bookAppointment);


export default router;