const Client = require("../models/Client");
const Report = require("../models/Report");
const FC = require("../models/FC");

const { createError } = require("../utils/error");

//REGISTER Client
module.exports.register = async (req, res, next) => {
  const client = await Client.findOne({ phoneNo: req.body.phoneNo });
  if (!client) {
    try {
      const newClient = await Client(req.body);
      const savedClient = await newClient.save();
      return res.status(201).json(savedClient);
    } catch (err) {
      return next(err);
    }
  } else {
    return res.status(200).json(client);
  }
};
//REGISTERN Client
module.exports.registerN = async (req, res, next) => {
    const client = await Client.findOne({ phoneNo: req.body.phoneNo });
    if (!client) {
      try {
        const newClient = await Client(req.body);
        const savedClient = await newClient.save();
        return res.status(201).json(savedClient);
      } catch (err) {
        return next(err);
      }
    } else {
      return res.status(200).json(client);
    }
  };
//UPDATE Client
module.exports.update = async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  // console.log(req.body.phoneNo);
  if (client) {
    const phoneExists = await Client.findOne({ phoneNo: req.body.phone });
    if (phoneExists && phoneExists.id !== req.params.id) {
      return res
        .status(500)
        .json("Client with same phone number is already registered!");
    } else {
      try {
        const prevPhone = client.phoneNo;
        // console.log(prevPhone);
        const findReports = await Report.find({ phoneNum: prevPhone });
        // console.log(prevPhone);*
        const findFC = await FC.find({ phoneNum: prevPhone });
        // console.log(findReports)
        const updatedReport = await Report.updateMany(
          { phoneNum: prevPhone },
          { $set: { phoneNum: req.body.phoneNo } }
        );
         // console.log(findFC)*
         const updateFC = await FC.updateMany(
          { phoneNum: prevPhone },
          { $set: { phoneNum: req.body.phoneNo } }
        );
        // console.log(updatedReport);
        const updatedClient = await Client.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
         

        return res.status(200).json(updatedClient);
      } catch (err) {
        return next(err);
      }
    }
  } else {
    return res.status(404).json("Client doesn't exist!");
  }
};

// GET ALL Client
module.exports.getClient = async (req, res, next) => {
  try {
    const Client = await Client.find();
    return res.status(200).json(client);
  } catch (err) {
    return next(err);
  }
};

// GET A SINGLE Client INFO
module.exports.getClientInfo = async (req, res, next) => {
  try {
    const clientInfo = await Client.findById(req.params.id);
    return res.status(200).json(clientInfo);
  } catch (err) {
    return next(err);
  }
};
// GET A SINGLE Client INFON
module.exports.getClientInfon = async (req, res, next) => {
  try {
    const clientInfon = await Client.findById(req.params.id);
    return res.status(200).json(clientInfon);
  } catch (err) {
    return next(err);
  }
};