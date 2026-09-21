const mongoose = require("mongoose");

const NurseSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
      required: true,
      minlength: 6,
    },
    specialization: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    passcode:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nurse", NurseSchema); // Remplacement d'Infer par Nurse
