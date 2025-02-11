import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    petOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who owns the pet
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet", // Reference to the pet
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the doctor
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Cancelled"],
      default: "Pending",
    },
    query: {
      type: String,
    },
    doctorResponse: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending",
    }, // Track doctor's response
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;