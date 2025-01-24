import mongoose from "mongoose";

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
      required: false, // Optional in case the profile image is not provided
    },
    notes: {
      type: String,
      required: false, // Optional notes field
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
