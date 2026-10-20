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

    const newVS = new VS({
      patient: patient._id,
      nurseId: req.userId,
      firstName: req.body.firstName || patient.firstName,
      lastName: req.body.lastName || patient.lastName,
      age: req.body.age !== undefined ? req.body.age : patient.age,
      dob: req.body.dob || patient.dob,
      sex: req.body.sex || patient.sex,
      blood_pressure: req.body.blood_pressure,
      doctor: req.body.doctor,
      Diabetic_status: req.body.Diabetic_status,
      phoneNum: req.body.phoneNum,
    });

    const savedVS = await newVS.save();
    return res.status(201).json(savedVS);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS
module.exports.allVS = async (req, res, next) => {
  try {
    const VSList = await VS.find()
      .populate("patient", "firstName lastName phoneNo dob sex age")
      .populate("nurseId", "firstName lastName email specialization")
      .sort("-createdAt");
    return res.status(200).json(VSList);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS OF A SPECIFIC PATIENT
module.exports.patientVS = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ phoneNo: req.params.phone });
    if (!patient) {
      return next(
        createError(404, "Patient doesn't exist with this phone number!")
      );
    }

    const VSList = await VS.find({
      $or: [{ patient: patient._id }, { phoneNum: patient.phoneNo }],
    })
      .populate("patient", "firstName lastName phoneNo dob sex age")
      .populate("nurseId", "firstName lastName email specialization")
      .sort("-createdAt");

    return res.status(200).json(VSList);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS OF ALL PATIENTS FILTERED BY A SPECIFIC STATUS
module.exports.statusVS = async (req, res, next) => {
  try {
    const VSList = await VS.find({
      Diabetic_status: req.params.Diabetic_status,
    })
      .populate("patient", "firstName lastName phoneNo dob sex age")
      .populate("nurseId", "firstName lastName email specialization")
      .sort("-createdAt");

    return res.status(200).json(VSList);
  } catch (err) {
    return next(err);
  }
};
