const mongoose = require("mongoose");

const FCSchema = new mongoose.Schema(
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
      },
    },
    {
      timestamps: true,
    }
  );
  

module.exports = mongoose.model("FC", FCSchema);
