const express = require("express");

const router = express.Router();

const finalReportController = require("../Controllers/finalReportController");
const authenticateUser = require("../Middleware/authenticateUser");

router.put(
  "/updateFinalReport/:leadId",
  authenticateUser,
  finalReportController.updateFinalReport
);

router.post(
  "/exportToFinal",
  finalReportController.exportToFinal
);
module.exports = router;
