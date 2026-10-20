const mongoose = require("mongoose");
const User = require("./User");

const Doctor =
  User.discriminators && User.discriminators.doctor
    ? User.discriminators.doctor
    : User.discriminator("doctor", new mongoose.Schema({}));

module.exports = Doctor;
