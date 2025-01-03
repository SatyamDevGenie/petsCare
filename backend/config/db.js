import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.white(`MongoDB connected: ${conn.connection.host}`));
    } catch (err) {
        console.error(chalk.red(`Error: ${err.message}`));
        process.exit(1);
    }
};

export default connectDB;