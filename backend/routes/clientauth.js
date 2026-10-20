const express = require("express");
const clientController = require("../controllers/clientController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get(
  "/",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.getClient
);

router.post(
  "/register",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.register
);

router.post(
  "/registerN",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.registerN
);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.update
);

router.get(
  "/clientInfo/:id",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.getClientInfo
);

router.get(
  "/clientInfon/:id",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.getClientInfon
);

module.exports = router;
