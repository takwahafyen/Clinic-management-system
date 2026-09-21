const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", ClientSchema);
