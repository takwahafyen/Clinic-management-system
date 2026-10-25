const express = require("express");
const doctorsController = require("../controllers/doctorsController.js");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const { authLimiter } = require("../middlewares/rateLimiter");
const router = express.Router();

router.post("/register", authLimiter, doctorsController.register);
router.post("/login", authLimiter, doctorsController.login);
router.post("/logout", doctorsController.logout);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("doctor"),
  doctorsController.update
);

module.exports = router;
