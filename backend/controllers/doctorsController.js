const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

// REGISTER DOCTOR
module.exports.register = async (req, res, next) => {
  if (req.body.passcode === process.env.PASSCODE) {
    try {
      // Async password hashing
      const hash = await bcrypt.hash(req.body.password, 10);
      const newDoctor = new Doctor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        specialization: req.body.specialization,
        phone: req.body.phone,
      });

      const savedDoctor = await newDoctor.save();
      const { password, passcode, ...safeDoctor } = savedDoctor._doc;
      return res.status(201).json(safeDoctor);
    } catch (err) {
      return next(err);
    }
  } else {
    return next(
      createError(401, "You are not authorized to register as doctor!")
    );
  }
};

// DOCTOR LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) {
      return next(
        createError(
          404,
          "You are not yet registered. Please register yourself!"
        )
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      doctor.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Incorrect email or password!"));
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password, passcode, ...otherInfo } = doctor._doc;
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(otherInfo);
  } catch (err) {
    next(err);
  }
};

// DOCTOR UPDATE
module.exports.update = async (req, res, next) => {
  if (req.userId === req.params.id) {
    try {
      const updateData = {};
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.phone) {
        const doctorExists = await Doctor.findOne({ phone: req.body.phone });
        if (doctorExists && doctorExists._id.toString() !== req.params.id) {
          return next(createError(400, "This phone number already exists!"));
        }
        updateData.phone = req.body.phone;
      }
      if (req.body.password) {
        updateData.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      ).select("-password -passcode");

      return res.status(200).json(updatedDoctor);
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

// DOCTOR LOGOUT
module.exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully!" });
};
