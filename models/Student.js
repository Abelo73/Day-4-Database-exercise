const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["student", "teacher"], default: "student" },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
