const Enrollment = require("../models/Enrollment");

exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    // Validate request data

    if (!studentId || !courseId) {
      return res
        .status(400)
        .json({ message: "Student ID and Course ID are required" });
    }
    // check if enrollment already exists

    const existingEnrollment = await Enrollment.findOne({
      studentId,
      courseId,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in this course" });
    }
    // create new enrollment
    const enrollment = new Enrollment({ studentId, courseId });
    const savedEnrollment = await enrollment.save();
    if (savedEnrollment) {
      return res.status(201).json({
        message: "Enrollment created successfully",
        enrollment: savedEnrollment,
      });
    }
    res.status(400).json({ message: "Not enrolled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEnrollment = async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const skip = (page - 1) * limit;
    const totalEnrollments = await Enrollment.countDocuments();
    const enrollments = await Enrollment.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (enrollments.length === 0) {
      return res.status(404).json({ message: `Enrollment not found` });
    }
    res.status(200).json({
      message: "Enrollment fetched successfully",
      enrollments: enrollments,
      pagination: {
        totalEnrollments: totalEnrollments,
        limit: limit,
        currentPage: page,
        totalPages: Math.ceil(totalEnrollments / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEnrolledStudentsByCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $group: {
          _id: "$courseId",
          students: { $push: "$student" },
        },
      },
    ]);

    if (enrollments.length === 0) {
      return res.status(404).json({
        message: "No enrollment found",
      });
    }
    res.status(200).json({
      message: "Enrolled students fetched successfully",
      data: enrollments.map((enrollment) => ({
        courseId: enrollment._id,
        students: enrollment.students.flat(),
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get enrollment by id
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrolled = await Enrollment.findById(enrollmentId);

    if (!enrolled) {
      return res
        .status(404)
        .json({ message: `Enrollment with ID ${enrollmentId} not found` });
    }
    res
      .status(200)
      .json({ message: "Enrollment fetched successfully", enrolled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!enrollment) {
      return res
        .status(404)
        .json({ message: `Enrollment with ID ${enrollmentId} not found` });
    }

    res.status(200).json({
      message: "Enrollment deleted successfully",
      enrollment: enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update enrollment

exports.updateEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      req.body,
      { new: true }
    );
    if (!enrollment) {
      res
        .status(404)
        .json({ message: `Enrollment with ID ${enrollmentId} not found` });
    }
    res
      .status(200)
      .json({ message: "Enrollment updated successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
