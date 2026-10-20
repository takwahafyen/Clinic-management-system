const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    sex: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Dynamically compute age from Date of Birth
PatientSchema.virtual("age").get(function () {
  if (!this.dob) return undefined;
  const today = new Date();
  const birthDate = new Date(this.dob);
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    calculatedAge--;
  }
  return calculatedAge;
});

module.exports =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
