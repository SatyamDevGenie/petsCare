import express from "express";
import {

loginUser,
registerUser,
getUserProfile


} from "../controllers/userController.js";

import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(protect, getUserProfile)


export default router;