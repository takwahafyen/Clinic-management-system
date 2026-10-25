const Patient = require("../models/Patient");
const Report = require("../models/Report");
const { createError } = require("../utils/error");
const paginate = require("../utils/paginate");

const reportPopulateOptions = [
  { path: "patient", select: "firstName lastName phoneNo dob sex age" },
  { path: "doctorId", select: "firstName lastName email specialization" },
];

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
      patient: patient._id,
      doctorId: req.userId,
      firstName: req.body.firstName || patient.firstName,
      lastName: req.body.lastName || patient.lastName,
      age: req.body.age !== undefined ? req.body.age : patient.age,
      dob: req.body.dob || patient.dob,
      sex: req.body.sex || patient.sex,
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

// GET ALL REPORTS (Paginated)
module.exports.reports = async (req, res, next) => {
  try {
    const result = await paginate({
      model: Report,
      filter: {},
      reqQuery: req.query,
      res,
      populateOptions: reportPopulateOptions,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET ALL REPORTS OF A PATIENT (Paginated)
module.exports.allReports = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ phoneNo: req.params.phone });
    if (!patient) {
      return next(
        createError(404, "Patient doesn't exist with this phone number!")
      );
    }

    const result = await paginate({
      model: Report,
      filter: {
        $or: [{ patient: patient._id }, { phoneNum: patient.phoneNo }],
      },
      reqQuery: req.query,
      res,
      populateOptions: reportPopulateOptions,
    });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET ALL REPORTS OF ALL PATIENTS FILTERED BY A SPECIFIC STATUS (Paginated)
module.exports.statusReports = async (req, res, next) => {
  try {
    const result = await paginate({
      model: Report,
      filter: { status: req.params.status },
      reqQuery: req.query,
      res,
      populateOptions: reportPopulateOptions,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
