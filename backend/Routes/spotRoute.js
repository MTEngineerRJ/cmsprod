const express = require('express');

const router = express.Router();

const spotController = require("../Controllers/spotController");

router.get("/getDamageParts/:leadId",spotController.getDamageParts);

router.get("/getDamagePartsType",spotController.getDamagePartsTypes);

router.put("/updateDamageParts/:leadId", spotController.updateDamageParts);

module.exports = router;