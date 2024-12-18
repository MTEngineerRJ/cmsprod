const express = require('express');

const router = express.Router();

const preInspectionImagesController = require("../Controllers/preInspectionImagesController");

router.get("/getImages/:leadId", preInspectionImagesController.getPreInspectionImages);

router.put("/updateImages/:leadId", preInspectionImagesController.updateReportImages);


module.exports = router;