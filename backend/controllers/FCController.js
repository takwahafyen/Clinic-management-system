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

    const newFC = new FC(req.body);
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

// GET ALL FC OF ALL clientS FILTERED BY A SPECIFIC STATUS
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
