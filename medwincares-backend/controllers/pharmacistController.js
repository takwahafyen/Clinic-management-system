const Pharmacist = require("../models/Pharmacist"); // Remplacement de Nurse par Pharmacist
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

// REGISTER Pharmacist
module.exports.register = async (req, res, next) => {
  if (req.body.passcode === process.env.PASSCODE) {
    try {
      // Generating hashed password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newPharmacist = new Pharmacist({ // Remplacement de Nurse par Pharmacist
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        specialization: req.body.specialization,
        phone: req.body.phone,
        passcode: req.body.passcode,
      });

      const savedPharmacist = await newPharmacist.save(); // Remplacement de Nurse par Pharmacist
      return res.status(201).json(savedPharmacist); // Remplacement de Nurse par Pharmacist
    } catch (err) {
      return next(err);
    }
  } else {
    return next(
      createError(401, "You are not authorized to register as Pharmacist!") // Remplacement de Nurse par Pharmacist
    );
  }
};

// Pharmacist LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const pharmacist = await Pharmacist.findOne({ email: req.body.email }); // Remplacement de Nurse par Pharmacist
    if (!pharmacist) { // Remplacement de Nurse par Pharmacist
      return next(
        createError(
          404,
          "You are not yet registered. Please register yourself!"
        )
      );
    }

    //For comparing objects, used bcrypt compare method
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      pharmacist.password // Remplacement de Nurse par Pharmacist
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Incorrect email or password!"));
    }

    //We don't want to send password with our react application, so we will use destructuring.
    const { password, passcode, ...otherInfo } = pharmacist._doc; // Remplacement de Nurse par Pharmacist
    return res.status(200).json(otherInfo);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  if (req.body.pharmacistId === req.params.id) { // Remplacement de Nurse par Pharmacist
    let hash;
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(req.body.password, salt);
    }
    const pharmacistExists = await Pharmacist.findOne({ phone: req.body.phone }); // Remplacement de Nurse par Pharmacist

    if (pharmacistExists && pharmacistExists.id !== req.params.id) { // Remplacement de Nurse par Pharmacist
      return next(createError(400, "This phone number already exists!"));
    }
    try {
      const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
          },
        },
        { new: true }
      );
      return res.status(200).json(updatedPharmacist); // Remplacement de Nurse par Pharmacist
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(401, "You can update only your account!"));
  }
};
