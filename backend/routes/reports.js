const express = require("express");
const reportsController = require("../controllers/reportController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get(
  "/allReports",
  verifyToken,
  verifyRole("doctor"),
  reportsController.reports
);

router.get(
  "/reports/:status",
  verifyToken,
  verifyRole("doctor"),
  reportsController.statusReports
);

router.post(
  "/:id/create_report",
  verifyToken,
  verifyRole("doctor"),
  reportsController.createReport
);

router.get(
  "/:phone/all_reports",
  verifyToken,
  verifyRole("doctor"),
  reportsController.allReports
);

module.exports = router;
