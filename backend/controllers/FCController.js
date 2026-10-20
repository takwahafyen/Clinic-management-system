const Client = require("../models/Client");
const FC = require("../models/FC");
const { createError } = require("../utils/error");

// CREATE FC
module.exports.createFC = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return next(
        createError(404, "Client doesn't exist. Please register the Client!")
      );
    }

    if (client.phoneNo !== req.body.phoneNum) {
      return next(
        createError(
          400,
          "Phone number with which the client is registered is entered wrong!"
        )
      );
    }

    const newFC = new FC({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      dob: req.body.dob,
      sex: req.body.sex,
      quantite: req.body.quantite,
      doctor: req.body.doctor,
      medicament: req.body.medicament,
      phoneNum: req.body.phoneNum,
    });
    const savedFC = await newFC.save();
    return res.status(201).json(savedFC);
  } catch (err) {
    return next(err);
  }
};

// GET ALL FC
module.exports.allFC = async (req, res, next) => {
  try {
    const FCList = await FC.find().sort("-createdAt");
    return res.status(200).json(FCList);
  } catch (err) {
    return next(err);
  }
};

// GET ALL FC OF A SPECIFIC CLIENT
module.exports.clientFC = async (req, res, next) => {
  try {
    const client = await Client.findOne({ phoneNo: req.params.phone });
    if (!client) {
      return next(
        createError(404, "Client doesn't exist with this phone number!")
      );
    }
    const FCList = await FC.find({ phoneNum: client.phoneNo }).sort(
      "-createdAt"
    );
    return res.status(200).json(FCList);
  } catch (err) {
    return next(err);
  }
};

// GET ALL FC FILTERED BY MEDICAMENT
module.exports.statusFC = async (req, res, next) => {
  try {
    const FCList = await FC.find({ medicament: req.params.medicament }).sort(
      "-createdAt"
    );
    return res.status(200).json(FCList);
  } catch (err) {
    return next(err);
  }
};
