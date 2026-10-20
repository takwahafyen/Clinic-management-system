const Patient = require("../models/Patient");
const Report = require("../models/Report");
const VS = require("../models/VS");
const { createError } = require("../utils/error");

// REGISTER PATIENT
module.exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNo } = req.body;
    if (!phoneNo || !firstName) {
      return next(createError(400, "First name and phone number are required!"));
    }

    const patient = await Patient.findOne({ phoneNo });
    if (!patient) {
      const newPatient = new Patient({
        firstName,
        lastName,
        phoneNo,
      });
      const savedPatient = await newPatient.save();
      return res.status(201).json(savedPatient);
    } else {
      return res.status(200).json(patient);
    }
  } catch (err) {
    return next(err);
  }
};

// REGISTER PATIENT (NURSE)
module.exports.registerN = async (req, res, next) => {
  return module.exports.register(req, res, next);
};

// UPDATE PATIENT
module.exports.update = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return next(createError(404, "Patient doesn't exist!"));
    }

    const { firstName, lastName, phoneNo } = req.body;
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;

    if (phoneNo && phoneNo !== patient.phoneNo) {
      const phoneExists = await Patient.findOne({ phoneNo });
      if (phoneExists && phoneExists._id.toString() !== req.params.id) {
        return next(
          createError(409, "Patient with same phone number is already registered!")
        );
      }

      const prevPhone = patient.phoneNo;
      await Report.updateMany(
        { phoneNum: prevPhone },
        { $set: { phoneNum: phoneNo } }
      );
      await VS.updateMany(
        { phoneNum: prevPhone },
        { $set: { phoneNum: phoneNo } }
      );
      updateData.phoneNo = phoneNo;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedPatient);
  } catch (err) {
    return next(err);
  }
};

// GET ALL PATIENTS
module.exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  } catch (err) {
    return next(err);
  }
};

// GET A SINGLE PATIENT INFO
module.exports.getPatientInfo = async (req, res, next) => {
  try {
    const patientInfo = await Patient.findById(req.params.id);
    if (!patientInfo) {
      return next(createError(404, "Patient not found!"));
    }
    return res.status(200).json(patientInfo);
  } catch (err) {
    return next(err);
  }
};

// GET A SINGLE PATIENT INFO (NURSE)
module.exports.getPatientInfon = async (req, res, next) => {
  return module.exports.getPatientInfo(req, res, next);
};
