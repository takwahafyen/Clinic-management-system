const express = require("express");
const VSController = require("../controllers/VSController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/allVS", VSController.allVS);
router.get("/VS/:Diabetic_status", VSController.statusVS);

router.post(
  "/:id/create_VS",
  verifyToken,
  verifyRole("nurse"),
  VSController.createVS
);
router.get("/:phone/all_VS", VSController.allVS);

module.exports = router;
