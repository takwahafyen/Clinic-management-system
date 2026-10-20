const Patient = require("../models/Patient");
const Report = require("../models/Report");
const { createError } = require("../utils/error");

// CREATE REPORT
module.exports.createReport = async (req, res, next) => {
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

    const newReport = new Report({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      dob: req.body.dob,
      sex: req.body.sex,
      medicament: req.body.medicament,
      doctor: req.body.doctor,
      status: req.body.status,
      phoneNum: req.body.phoneNum,
    });

    const savedReport = await newReport.save();
    return res.status(201).json(savedReport);
  } catch (err) {
    return next(err);
  }
};

// GET ALL REPORTS
module.exports.reports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort("-createdAt");
    return res.status(200).json(reports);
  } catch (err) {
    return next(err);
  }
};

// GET ALL REPORTS OF A PATIENT
module.exports.allReports = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ phoneNo: req.params.phone });
    if (!patient) {
      return next(
        createError(404, "Patient doesn't exist with this phone number!")
      );
    }

    const reports = await Report.find({ phoneNum: patient.phoneNo }).sort(
      "-createdAt"
    );
    return res.status(200).json(reports);
  } catch (err) {
    return next(err);
  }
};

// GET ALL REPORTS OF ALL PATIENTS FILTERED BY A SPECIFIC STATUS
module.exports.statusReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ status: req.params.status }).sort(
      "-createdAt"
    );
    return res.status(200).json(reports);
  } catch (err) {
    return next(err);
  }
};
