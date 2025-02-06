import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false, // Optional
      default: '/images/default-image.jpg', // Default image URL
    },
    notes: {
      type: String,
      required: false, // Optional notes field
    },
    isDoctor: {
      type: Boolean,
      default: true, // Ensuring all entries default to a doctor
    },
  },
  { timestamps: true }
);


// Hash password before saving
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;






