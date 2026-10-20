const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: false,
    },
    doctorId: {
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
    medicament: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    status: {
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

module.exports =
  mongoose.models.Report || mongoose.model("Report", ReportSchema);
