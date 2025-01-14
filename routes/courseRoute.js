const express = require("express");
const router = express.Router();
// const Course = require("./models/course");
const courseRoute = require("../controllers/courseController");

// Create a new course

router.post("/", courseRoute.createCourse);
router.get("/", courseRoute.getAllCourses);
router.get("/:id", courseRoute.getCoursesById);
router.put("/:id", courseRoute.updateCourseById);
router.delete("/:id", courseRoute.deleteCourseById);
module.exports = router;
