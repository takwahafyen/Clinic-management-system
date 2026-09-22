const express = require("express");
const FCController = require("../controllers/FCController");
const router = express.Router();

router.get("/allFC", FCController.allFC);
router.get("/FC/:medicament", FCController.statusFC);

router.post("/:id/create_FC", FCController.createFC);
router.get("/:phone/all_FC", FCController.allFC);

module.exports = router;
