const TimeEntry = require("../model/TimeEntry");

exports.clockIn = async (req, res) => {
  const { employeeId, notes } = req.body;
  const entry = new TimeEntry({
    employeeId,
    clockIn: new Date(),
    notes,
  });
  await entry.save();
  res.json({ message: "Clocked in", entry });
};

exports.clockOut = async (req, res) => {
  const { employeeId } = req.body;
  const entry = await TimeEntry.findOne({ employeeId, clockOut: null }).sort({
    clockIn: -1,
  });
  if (!entry)
    return res.status(404).json({ message: "No active clock-in found" });
  entry.clockOut = new Date();
  await entry.save();
  res.json({ message: "Clocked out", entry });
};

exports.getEntries = async (req, res) => {
  const { employeeId } = req.params;
  const entries = await TimeEntry.find({ employeeId });
  res.json(entries);
};
