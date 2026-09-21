const express = require("express");
const patientsController = require("../controllers/patientsController");
const router = express.Router();

router.get("/", patientsController.getPatients);
router.post("/register", patientsController.register);
router.post("/registerN", patientsController.registerN);

router.put("/update/:id", patientsController.update);
router.get("/patientInfo/:id",patientsController.getPatientInfo)
router.get("/patientInfon/:id",patientsController.getPatientInfon)


module.exports = router;
