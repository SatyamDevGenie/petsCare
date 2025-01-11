import mongoose from "mongoose";

const petSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Bird", "Other"], // Restrict to common types
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    vaccinationRecords: [
      {
        vaccineName: { type: String, required: true },
        dateAdministered: { type: Date, required: true },
        nextDueDate: { type: Date },
      },
    ],
    isNeutered: {
      type: Boolean,
      required: true,
      default: false,
    },
    notes: {
      type: String,
    },
    petImage: {
      type: String, // Store the URL or file path to the pet image
      required: false, // Not mandatory but can be added later
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
