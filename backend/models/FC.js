const mongoose = require("mongoose");

const FCSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: false,
    },
    pharmacistId: {
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
    quantite: {
      type: Number,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    medicament: {
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

module.exports = mongoose.models.FC || mongoose.model("FC", FCSchema);
