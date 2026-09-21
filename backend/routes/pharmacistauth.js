const express = require("express");
const pharmacistController = require("../controllers/pharmacistController.js"); // Remplacement de nurseController par pharmacistController
const router = express.Router();

router.post("/register", pharmacistController.register); // Remplacement de nurseController par pharmacistController

router.post("/login", pharmacistController.login); // Remplacement de nurseController par pharmacistController
router.put("/update/:id", pharmacistController.update); // Remplacement de nurseController par pharmacistController

/* Checking for verification middlewares */
// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("You are logged in!");
// });

// router.get("/checkdoctor/:id", verifyDoctor, (req, res, next) => {
//   res.send("Hello doctor, you are logged in and you can perform operations.");
// });

module.exports = router;
