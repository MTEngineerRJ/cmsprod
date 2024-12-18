const express = require('express');

const router = express.Router();

const PartsController = require("../Controllers/PartsController");

router.get("/getVehicleTypeParts/:vehicleType", PartsController.getVehicleParts);

router.get("/getVehicleStateParts", PartsController.getVehicleStates);

router.get("/getVehiclePartsDetails/:leadId", PartsController.getVehiclePartsDetails);

router.get("/getSPecificPreInspectionDetails/:leadId", PartsController.getSpecificPreInspectionDetails);

router.put("/updateVehiclePartsDetails/:leadId", PartsController.updateVehiclePartsDetails);

module.exports = router;