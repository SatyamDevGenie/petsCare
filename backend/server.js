import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import connectDB from "./config/db.js";


dotenv.config(); // For Env

connectDB(); // connection to Mongodb

const app = express();
app.use(express.json()); // Accepting the json data

app.get("/", (req, res) => {
  res.send("API is running");
});


// ENV Setup
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
});
