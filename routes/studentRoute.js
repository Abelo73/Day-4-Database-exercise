const express = require("express");
const router = express.Router();
// const Student = require("../models/Student");
const studentRoute = require("../controllers/studentController");

// Routes for students

router.post("/", studentRoute.createStudent);
router.get("/", studentRoute.getAllStudents);
router.get("/pagination", studentRoute.getAllStudentsWithPagination);
router.get("/:id", studentRoute.getStudentById);
router.put("/:id", studentRoute.updateStudentById);
router.delete("/:id", studentRoute.deleteStudentById);
module.exports = router;
