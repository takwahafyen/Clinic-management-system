const Client = require("../models/Client");
const FC = require("../models/FC");
const { createError } = require("../utils/error");

// REGISTER CLIENT
module.exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNo } = req.body;
    if (!phoneNo || !firstName) {
      return next(createError(400, "First name and phone number are required!"));
    }

    const client = await Client.findOne({ phoneNo });
    if (!client) {
      const newClient = new Client({
        firstName,
        lastName,
        phoneNo,
      });
      const savedClient = await newClient.save();
      return res.status(201).json(savedClient);
    } else {
      return res.status(200).json(client);
    }
  } catch (err) {
    return next(err);
  }
};

// REGISTER CLIENT (PHARMACIST / NURSE)
module.exports.registerN = async (req, res, next) => {
  return module.exports.register(req, res, next);
};

// UPDATE CLIENT
module.exports.update = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return next(createError(404, "Client doesn't exist!"));
    }

    const { firstName, lastName, phoneNo } = req.body;
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;

    if (phoneNo && phoneNo !== client.phoneNo) {
      const phoneExists = await Client.findOne({ phoneNo });
      if (phoneExists && phoneExists._id.toString() !== req.params.id) {
        return next(
          createError(409, "Client with same phone number is already registered!")
        );
      }

      const prevPhone = client.phoneNo;
      await FC.updateMany(
        { phoneNum: prevPhone },
        { $set: { phoneNum: phoneNo } }
      );
      updateData.phoneNo = phoneNo;
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedClient);
  } catch (err) {
    return next(err);
  }
};

// GET ALL CLIENTS
module.exports.getClient = async (req, res, next) => {
  try {
    const clients = await Client.find();
    return res.status(200).json(clients);
  } catch (err) {
    return next(err);
  }
};

// GET A SINGLE CLIENT INFO
module.exports.getClientInfo = async (req, res, next) => {
  try {
    const clientInfo = await Client.findById(req.params.id);
    if (!clientInfo) {
      return next(createError(404, "Client not found!"));
    }
    return res.status(200).json(clientInfo);
  } catch (err) {
    return next(err);
  }
};

// GET A SINGLE CLIENT INFO (SECONDARY)
module.exports.getClientInfon = async (req, res, next) => {
  return module.exports.getClientInfo(req, res, next);
};
