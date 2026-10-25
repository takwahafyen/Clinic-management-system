const Client = require("../models/Client");
const FC = require("../models/FC");
const { createError } = require("../utils/error");
const paginate = require("../utils/paginate");

const fcPopulateOptions = [
  { path: "client", select: "firstName lastName phoneNo dob sex age" },
  { path: "pharmacistId", select: "firstName lastName email specialization" },
];

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
      client: client._id,
      pharmacistId: req.userId,
      firstName: req.body.firstName || client.firstName,
      lastName: req.body.lastName || client.lastName,
      age: req.body.age !== undefined ? req.body.age : client.age,
      dob: req.body.dob || client.dob,
      sex: req.body.sex || client.sex,
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

// GET ALL FC (Paginated)
module.exports.allFC = async (req, res, next) => {
  try {
    const result = await paginate({
      model: FC,
      filter: {},
      reqQuery: req.query,
      res,
      populateOptions: fcPopulateOptions,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET ALL FC OF A SPECIFIC CLIENT (Paginated)
module.exports.clientFC = async (req, res, next) => {
  try {
    const client = await Client.findOne({ phoneNo: req.params.phone });
    if (!client) {
      return next(
        createError(404, "Client doesn't exist with this phone number!")
      );
    }

    const result = await paginate({
      model: FC,
      filter: {
        $or: [{ client: client._id }, { phoneNum: client.phoneNo }],
      },
      reqQuery: req.query,
      res,
      populateOptions: fcPopulateOptions,
    });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET ALL FC FILTERED BY MEDICAMENT (Paginated)
module.exports.statusFC = async (req, res, next) => {
  try {
    const result = await paginate({
      model: FC,
      filter: { medicament: req.params.medicament },
      reqQuery: req.query,
      res,
      populateOptions: fcPopulateOptions,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
