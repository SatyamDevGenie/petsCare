import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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
      type: mongoose.Schema.Types.Mixed, // Allows any type for the password
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash the password if it's modified before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  if (typeof this.password !== "string") {
    // Convert the password to a string if it's not already
    this.password = String(this.password);
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (typeof enteredPassword !== "string") {
    // Convert entered password to a string if it's not already
    enteredPassword = String(enteredPassword);
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
