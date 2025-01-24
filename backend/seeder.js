import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pets from "./data/pets.js";
import users from "./data/users.js";
import doctors from "./data/doctors.js";
import Pet from "./models/petModel.js";
import User from "./models/userModel.js";
import Doctor from "./models/doctorModel.js";
import Appointment from "./models/appointmentModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Delete existing data to avoid duplication
    await Doctor.deleteMany();
    await Pet.deleteMany();
    await User.deleteMany();
    await Appointment.deleteMany();

    // Insert user data and get their IDs
    const createdUsers = await User.insertMany(users);

    // Create a map of user email to user ID
    const userMap = createdUsers.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Create pets and ensure 'user' field references valid ObjectId
    const samplePets = pets.map((pet, index) => ({
      ...pet,
      user: userMap[users[index % users.length].email], // Assign user ID based on email
    }));

    // Insert pets data into the database
    await Pet.insertMany(samplePets);

    // Insert doctors data into the database
    await Doctor.insertMany(doctors);

    console.log("Data imported successfully!");
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all pets, users, doctors data
    await Doctor.deleteMany();
    await Pet.deleteMany();
    await User.deleteMany();
    await Appointment.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

// Check command line argument to determine whether to destroy or import data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
