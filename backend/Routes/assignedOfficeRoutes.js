const express = require('express');

const router = express.Router();

const assignedOfficeController = require("../Controllers/assignedOfficeController");

router.get("/getAssignedOffice",assignedOfficeController.getAssignedOffice);

module.exports = router;