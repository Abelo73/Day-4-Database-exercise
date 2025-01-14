const express = require("express");
const router = express.Router();
const enrollmentRoute = require("../controllers/enrollmentController");

router.post("/", enrollmentRoute.createEnrollment);
router.get("/", enrollmentRoute.getAllEnrollment);
router.get("/:id", enrollmentRoute.getEnrollmentById);
router.get("/group/:id", enrollmentRoute.getAllEnrolledStudentsByCourse);
router.put("/:id", enrollmentRoute.updateEnrollment);
router.delete("/:id", enrollmentRoute.deleteEnrollment);

module.exports = router;
