const express = require("express");
const pharmacistController = require("../controllers/pharmacistController.js");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const { authLimiter } = require("../middlewares/rateLimiter");
const router = express.Router();

router.post("/register", authLimiter, pharmacistController.register);
router.post("/login", authLimiter, pharmacistController.login);
router.post("/logout", pharmacistController.logout);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("pharmacist"),
  pharmacistController.update
);

module.exports = router;
