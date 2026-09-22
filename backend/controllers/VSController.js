const Patient = require("../models/Patient");
const VS = require("../models/VS");
const { createError } = require("../utils/error");

// CREATE VS
module.exports.createVS = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return next(
        createError(404, "Patient doesn't exist. Please register the patient!")
      );
    }

    if (patient.phoneNo !== req.body.phoneNum) {
      return next(
        createError(
          400,
          "Phone number with which the patient is registered is entered wrong!"
        )
      );
    }

    const newVS = new VS(req.body);
    const savedVS = await newVS.save();
    return res.status(201).json(savedVS);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS
module.exports.allVS = async (req, res, next) => {
  try {
    const VSList = await VS.find().sort("-createdAt");
    return res.status(200).json(VSList);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS OF ALL PATIENTS FILTERED BY A SPECIFIC STATUS
module.exports.statusVS = async (req, res, next) => {
  try {
    const VSList = await VS.find({ Diabetic_status: req.params.Diabetic_status }).sort(
      "-createdAt"
    );
    return res.status(200).json(VSList);
  } catch (err) {
    return next(err);
  }
};
