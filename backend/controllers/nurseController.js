const Nurse = require("../models/Nurse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

// REGISTER NURSE
module.exports.register = async (req, res, next) => {
  if (req.body.passcode === process.env.PASSCODE) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newNurse = new Nurse({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        specialization: req.body.specialization,
        phone: req.body.phone,
      });

      const savedNurse = await newNurse.save();
      const { password, passcode, ...safeNurse } = savedNurse._doc;
      return res.status(201).json(safeNurse);
    } catch (err) {
      return next(err);
    }
  } else {
    return next(
      createError(401, "You are not authorized to register as Nurse!")
    );
  }
};

// NURSE LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const nurse = await Nurse.findOne({ email: req.body.email });
    if (!nurse) {
      return next(
        createError(
          404,
          "You are not yet registered. Please register yourself!"
        )
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      nurse.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Incorrect email or password!"));
    }

    const token = jwt.sign(
      { id: nurse._id, role: "nurse" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password, passcode, ...otherInfo } = nurse._doc;
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

// NURSE UPDATE
module.exports.update = async (req, res, next) => {
  if (req.userId === req.params.id) {
    try {
      const updateData = {};
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.phone) {
        const nurseExists = await Nurse.findOne({ phone: req.body.phone });
        if (nurseExists && nurseExists._id.toString() !== req.params.id) {
          return next(createError(400, "This phone number already exists!"));
        }
        updateData.phone = req.body.phone;
      }
      if (req.body.password) {
        updateData.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedNurse = await Nurse.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      ).select("-password -passcode");

      return res.status(200).json(updatedNurse);
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

// NURSE LOGOUT
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
