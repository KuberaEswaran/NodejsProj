const Payroll = require("../model/Payroll");
const TimeEntry = require("../model/TimeEntry");
const fetchOnlineTax = require("../utils/fetchOnlineTax");

exports.calculatePayroll = async (req, res) => {
  try {
    const { employeeId, periodStart, periodEnd, hourlyRate } = req.body;
    if (!employeeId || !periodStart || !periodEnd || !hourlyRate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Normalize start and end time
    const start = new Date(periodStart);
    start.setHours(0, 0, 0, 0);

    const end = new Date(periodEnd);
    end.setHours(23, 59, 59, 999);

    // ✅ Fetch entries within full date range
    const entries = await TimeEntry.find({
      employeeId,
      clockIn: { $gte: start, $lte: end },
      clockOut: { $ne: null },
    });

    if (entries.length === 0) {
      return res.status(404).json({ message: "No time entries found" });
    }

    let totalHours = 0;
    entries.forEach((entry) => {
      const hours = (entry.clockOut - entry.clockIn) / (1000 * 60 * 60);
      totalHours += hours;
    });

    const grossPay = totalHours * hourlyRate;
    const deductions = await fetchOnlineTax(grossPay);
    const netPay = grossPay - deductions;

    const payroll = new Payroll({
      employeeId,
      periodStart: start,
      periodEnd: end,
      totalHours,
      grossPay,
      deductions,
      netPay,
    });

    await payroll.save();

    res.status(201).json({
      message: "Payroll calculated successfully",
      payroll,
    });
  } catch (err) {
    console.error("Payroll Calculation Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getPayroll = async (req, res) => {
  const { employeeId } = req.params;
  const payrolls = await Payroll.find({ employeeId });
  res.json(payrolls);
};
