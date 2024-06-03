const express = require("express");
const clientController = require("../controllers/clientController");
const router = express.Router();

router.get("/", clientController.getClient);
router.post("/register", clientController.register);
router.post("/registerN", clientController.registerN);

router.put("/update/:id", clientController.update);
router.get("/clientInfo/:id",clientController.getClientInfo)
router.get("/clientInfon/:id",clientController.getClientInfon)


module.exports = router;
