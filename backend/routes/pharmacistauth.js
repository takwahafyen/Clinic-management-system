const express = require("express");
const pharmacistController = require("../controllers/pharmacistController.js");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", pharmacistController.register);

router.post("/login", pharmacistController.login);
router.put(
  "/update/:id",
  verifyToken,
  verifyRole("pharmacist"),
  pharmacistController.update
);

module.exports = router;
