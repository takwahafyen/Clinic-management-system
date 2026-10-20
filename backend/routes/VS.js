const express = require("express");
const VSController = require("../controllers/VSController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get(
  "/allVS",
  verifyToken,
  verifyRole("nurse", "doctor"),
  VSController.allVS
);

router.get(
  "/VS/:Diabetic_status",
  verifyToken,
  verifyRole("nurse", "doctor"),
  VSController.statusVS
);

router.post(
  "/:id/create_VS",
  verifyToken,
  verifyRole("nurse"),
  VSController.createVS
);

router.get(
  "/:phone/all_VS",
  verifyToken,
  verifyRole("nurse", "doctor"),
  VSController.allVS
);

module.exports = router;
