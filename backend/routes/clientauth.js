const express = require("express");
const clientController = require("../controllers/clientController");
const { verifyToken, verifyRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", clientController.getClient);
router.post("/register", clientController.register);
router.post("/registerN", clientController.registerN);

router.put(
  "/update/:id",
  verifyToken,
  verifyRole("pharmacist"),
  clientController.update
);
router.get("/clientInfo/:id",clientController.getClientInfo)
router.get("/clientInfon/:id",clientController.getClientInfon)


module.exports = router;
