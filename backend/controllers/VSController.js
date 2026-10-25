const Patient = require("../models/Patient");
const VS = require("../models/VS");
const { createError } = require("../utils/error");
const paginate = require("../utils/paginate");

const vsPopulateOptions = [
  { path: "patient", select: "firstName lastName phoneNo dob sex age" },
  { path: "nurseId", select: "firstName lastName email specialization" },
];

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

// GET ALL VS (Paginated)
module.exports.allVS = async (req, res, next) => {
  try {
    const result = await paginate({
      model: VS,
      filter: {},
      reqQuery: req.query,
      res,
      populateOptions: vsPopulateOptions,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS OF A SPECIFIC PATIENT (Paginated)
module.exports.patientVS = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ phoneNo: req.params.phone });
    if (!patient) {
      return next(
        createError(404, "Patient doesn't exist with this phone number!")
      );
    }

    const result = await paginate({
      model: VS,
      filter: {
        $or: [{ patient: patient._id }, { phoneNum: patient.phoneNo }],
      },
      reqQuery: req.query,
      res,
      populateOptions: vsPopulateOptions,
    });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET ALL VS OF ALL PATIENTS FILTERED BY A SPECIFIC STATUS (Paginated)
module.exports.statusVS = async (req, res, next) => {
  try {
    const result = await paginate({
      model: VS,
      filter: { Diabetic_status: req.params.Diabetic_status },
      reqQuery: req.query,
      res,
      populateOptions: vsPopulateOptions,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
