const mongoose = require("mongoose");

const VSSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    sex: {
      type: String,
      required: true,
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VS", VSSchema);
