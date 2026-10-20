const express = require("express");
const patientsController = require("../controllers/patientsController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get(
  "/",
  verifyToken,
  verifyRole("doctor", "nurse"),
  patientsController.getPatients
);

router.post(
  "/register",
  verifyToken,
  verifyRole("doctor", "nurse"),
  patientsController.register
);

router.post(
  "/registerN",
  verifyToken,
  verifyRole("nurse"),
  patientsController.registerN
);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("doctor", "nurse"),
  patientsController.update
);

router.get(
  "/patientInfo/:id",
  verifyToken,
  verifyRole("doctor", "nurse"),
  patientsController.getPatientInfo
);

router.get(
  "/patientInfon/:id",
  verifyToken,
  verifyRole("nurse"),
  patientsController.getPatientInfon
);

module.exports = router;
