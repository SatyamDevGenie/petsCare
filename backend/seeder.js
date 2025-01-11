import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pets from "./data/pets.js";
import users from "./data/users.js";
import Pet from "./models/petModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Delete existing data to avoid duplication
    await Pet.deleteMany();
    await User.deleteMany();

    // Insert user data and get their ids
    const createdUsers = await User.insertMany(users);

    // Create a map of user email to user ID
    const userMap = createdUsers.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Create pets and ensure 'user' field references valid ObjectId
    const samplePets = pets.map((pet, index) => ({
      ...pet,
      user: userMap[users[index % users.length].email], // Make sure the field name is 'user' and it's populated with valid ObjectId
    }));

    // Insert pets data into the database
    await Pet.insertMany(samplePets);
    console.log("Data imported successfully");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all pet and user data
    await Pet.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

// Check command line argument to determine whether to destroy or import data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
