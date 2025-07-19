const mongoose = require("mongoose");

const timeEntrySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  notes: { type: String },
});

module.exports = mongoose.model("TimeEntry", timeEntrySchema);
