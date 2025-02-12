import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pets from "./data/pets.js";
import users from "./data/users.js";
import doctors from "./data/doctors.js";
import services from "./data/services.js"; // Import services data
import Pet from "./models/petModel.js";
import User from "./models/userModel.js";
import Doctor from "./models/doctorModel.js";
import Appointment from "./models/appointmentModel.js";
import Service from "./models/serviceModel.js"; // Import the Service model

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Delete existing data to avoid duplication
    await Doctor.deleteMany();
    await Pet.deleteMany();
    await User.deleteMany();
    await Appointment.deleteMany();
    await Service.deleteMany(); // Delete existing services data

    // Insert users and get their IDs
    const createdUsers = await User.insertMany(users);

    // Create a map of user email to user ID
    const userMap = createdUsers.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Insert doctors and get their IDs
    const createdDoctors = await Doctor.insertMany(doctors);

    // Create a map of doctor email to doctor ID
    const doctorMap = createdDoctors.reduce((map, doctor) => {
      map[doctor.email] = doctor._id;
      return map;
    }, {});

    // Create pets and assign user and doctor references
    const samplePets = pets.map((pet, index) => ({
      ...pet,
      user: userMap[users[index % users.length].email], // Assign user ID
      doctor: doctorMap[doctors[index % doctors.length].email] || null, // Assign doctor ID if applicable
    }));

    // Insert pets into the database
    await Pet.insertMany(samplePets);

    // Insert services data into the database
    const sampleServices = services.map((service) => ({
      title: service.title,
      description: service.description,
      price: service.price,
      image: service.image, // Optional
    }));
    await Service.insertMany(sampleServices); // Insert services

    console.log("Data imported successfully!");
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all data
    await Doctor.deleteMany();
    await Pet.deleteMany();
    await User.deleteMany();
    await Appointment.deleteMany();
    await Service.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

// Check command line argument
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}



