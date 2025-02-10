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
    console.log("Deleting existing data...");
    // Delete all existing data
    await Appointment.deleteMany();
    await Pet.deleteMany();
    await Service.deleteMany();
    await Doctor.deleteMany();
    await User.deleteMany();

    console.log("Inserting new data...");
    
    // Insert users and doctors first
    const createdUsers = await User.insertMany(users);
    const createdDoctors = await Doctor.insertMany(doctors);

    // Map user and doctor emails to their _ids
    const userMap = createdUsers.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    const doctorMap = createdDoctors.reduce((map, doctor) => {
      map[doctor.email] = doctor._id;
      return map;
    }, {});

    // Assign user and doctor IDs to pets
    const samplePets = pets.map((pet, index) => ({
      ...pet,
      user: userMap[users[index % users.length].email], // Assign user ID
      doctor: doctorMap[doctors[index % doctors.length].email], // Assign doctor ID
    }));

    // Insert pets into the database
    await Pet.insertMany(samplePets);

    // Insert services data
    const sampleServices = services.map((service) => ({
      title: service.title,
      description: service.description,
      price: service.price,
      image: service.image, // Optional
    }));
    await Service.insertMany(sampleServices);

    console.log("✅ Data imported successfully!");
    process.exit();
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Deleting all data...");
    await Appointment.deleteMany();
    await Pet.deleteMany();
    await Service.deleteMany();
    await Doctor.deleteMany();
    await User.deleteMany();

    console.log("✅ Data destroyed successfully!");
    process.exit();
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

// Check command line argument to determine action
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
