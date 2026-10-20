const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["doctor", "nurse", "pharmacist", "admin"],
      default: "doctor",
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passcode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  }
);

// Prevent re-compiling model in hot-reload or test environments
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
