const express = require("express");
const nurseController = require("../controllers/nurseController.js");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", nurseController.register);

router.post("/login", nurseController.login);
router.put(
  "/update/:id",
  verifyToken,
  verifyRole("nurse"),
  nurseController.update
);

module.exports = router;
