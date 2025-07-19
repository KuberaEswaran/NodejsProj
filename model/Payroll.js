const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  totalHours: { type: Number, required: true },
  grossPay: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true },
});

module.exports = mongoose.model("Payroll", payrollSchema);
