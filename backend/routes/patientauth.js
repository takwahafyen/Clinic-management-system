const express = require("express");
const patientsController = require("../controllers/patientsController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", patientsController.getPatients);
router.post("/register", patientsController.register);
router.post("/registerN", patientsController.registerN);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("doctor", "nurse"),
  patientsController.update
);
router.get("/patientInfo/:id",patientsController.getPatientInfo)
router.get("/patientInfon/:id",patientsController.getPatientInfon)


module.exports = router;
