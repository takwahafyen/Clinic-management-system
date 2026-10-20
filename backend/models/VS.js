const mongoose = require("mongoose");

const VSSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: false,
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    sex: {
      type: String,
      required: false,
    },
    blood_pressure: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    Diabetic_status: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.VS || mongoose.model("VS", VSSchema);
