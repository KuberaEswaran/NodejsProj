const express = require("express");
const router = express.Router();
const payrollController = require("../../controllers/payrollController");

router.post("/calculate", payrollController.calculatePayroll);
router.get("/:employeeId", payrollController.getPayroll);

module.exports = router;
