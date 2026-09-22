const express = require("express");
const doctorsController = require("../controllers/doctorsController.js");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", doctorsController.register);

router.post("/login", doctorsController.login);
router.put(
  "/update/:id",
  verifyToken,
  verifyRole("doctor"),
  doctorsController.update
);

module.exports = router;
