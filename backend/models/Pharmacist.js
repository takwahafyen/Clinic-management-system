const mongoose = require("mongoose");
const User = require("./User");

const Pharmacist =
  User.discriminators && User.discriminators.pharmacist
    ? User.discriminators.pharmacist
    : User.discriminator("pharmacist", new mongoose.Schema({}));

module.exports = Pharmacist;
