const express = require("express");
const nurseController = require("../controllers/nurseController.js");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const { authLimiter } = require("../middlewares/rateLimiter");
const router = express.Router();

router.post("/register", authLimiter, nurseController.register);
router.post("/login", authLimiter, nurseController.login);
router.post("/logout", nurseController.logout);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("nurse"),
  nurseController.update
);

module.exports = router;
