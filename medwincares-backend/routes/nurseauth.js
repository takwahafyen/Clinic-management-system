const express = require("express");
const nurseController = require("../controllers/nurseController.js"); 
const router = express.Router();

router.post("/register", nurseController.register); 

router.post("/login", nurseController.login); 
router.put("/update/:id", nurseController.update); 

/* Checking for verification middlewares */
// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("You are logged in!");
// });

// router.get("/checkdoctor/:id", verifyDoctor, (req, res, next) => {
//   res.send("Hello doctor, you are logged in and you can perform operations.");
// });

module.exports = router;
