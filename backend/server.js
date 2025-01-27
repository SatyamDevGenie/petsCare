import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import connectDB from "./config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";
import petRoutes from "../backend/routes/petRoutes.js";
import serviceRoutes from "../backend/routes/serviceRoutes.js";
import doctorRoutes from "../backend/routes/doctorRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";


dotenv.config(); // For Env

connectDB(); // connection to Mongodb

const app = express();
app.use(express.json()); // Accepting the json data
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/services", serviceRoutes)
app.use("/api/doctors", doctorRoutes)

app.get("/", (req, res) => {
  res.send("petsCare API is running");
});



// Middlewares
app.use(notFound);
app.use(errorHandler);


// ENV Setup
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
});
