const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const studentRoute = require("../controllers/studentController");

// Routes to create a new student

router.post("/", studentRoute.createStudent);

// Get all students

router.get("/", studentRoute.getAllStudents);

// Get all students with pagination

router.get("/pagination", studentRoute.getAllStudentsWithPagination);

// Get single student

router.get("/:id", studentRoute.getStudentById);

// Update student

router.put("/:id", studentRoute.updateStudentById);

// Delete student

router.delete("/:id", studentRoute.deleteStudentById);
module.exports = router;
