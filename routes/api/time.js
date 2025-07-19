const express = require("express");
const router = express.Router();
const timeController = require("../../controllers/timeController");

router.post("/clockin", timeController.clockIn);
router.post("/clockout", timeController.clockOut);
router.get("/:employeeId", timeController.getEntries);

module.exports = router;
