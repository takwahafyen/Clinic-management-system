const mongoose = require("mongoose");
const User = require("./User");

const Nurse =
  User.discriminators && User.discriminators.nurse
    ? User.discriminators.nurse
    : User.discriminator("nurse", new mongoose.Schema({}));

module.exports = Nurse;
