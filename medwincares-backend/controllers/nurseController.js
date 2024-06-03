const Nurse = require("../models/Nurse"); // Remplacement d'Infer par Nurse
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

// REGISTER Nurse
module.exports.register = async (req, res, next) => {
  if (req.body.passcode === process.env.PASSCODE) {
    try {
      // Generating hashed password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newNurse = new Nurse({ // Remplacement d'Infer par Nurse
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        specialization: req.body.specialization,
        phone: req.body.phone,
        passcode: req.body.passcode,
      });

      const savedNurse = await newNurse.save(); // Remplacement d'Infer par Nurse
      return res.status(201).json(savedNurse); // Remplacement d'Infer par Nurse
    } catch (err) {
      return next(err);
    }
  } else {
    return next(
      createError(401, "You are not authorized to register as Nurse!") // Remplacement d'Infer par Nurse
    );
  }
};

// Nurse LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const nurse = await Nurse.findOne({ email: req.body.email }); // Remplacement d'Infer par Nurse
    if (!nurse) { // Remplacement d'Infer par Nurse
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
      nurse.password // Remplacement d'Infer par Nurse
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Incorrect email or password!"));
    }

    //We don't want to send password with our react application, so we will use destructuring.
    const { password, passcode, ...otherInfo } = nurse._doc; // Remplacement d'Infer par Nurse
    return res.status(200).json(otherInfo);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  if (req.body.nurseId === req.params.id) { // Remplacement d'Infer par Nurse
    let hash;
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(req.body.password, salt);
    }
    const nurseExists = await Nurse.findOne({ phone: req.body.phone }); // Remplacement d'Infer par Nurse

    if (nurseExists && nurseExists.id !== req.params.id) { // Remplacement d'Infer par Nurse
      return next(createError(400, "This phone number already exists!"));
    }
    try {
      const updatedNurse = await Nurse.findByIdAndUpdate(
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
      return res.status(200).json(updatedNurse); // Remplacement d'Infer par Nurse
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(401, "You can update only your account!"));
  }
};
