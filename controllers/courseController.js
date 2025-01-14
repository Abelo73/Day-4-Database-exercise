const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    if (!savedCourse) {
      return res.status(400).json({ message: "Course not created" });
    }
    res
      .status(201)
      .json({ message: "Course created successfully", courses: savedCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all course with pagination

exports.getAllCourses = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;
    const totalCourses = await Course.countDocuments();
    const courses = await Course.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({
      message: "Courses retrieved successfully",
      courses,
      pagination: {
        totalCourses: totalCourses,
        totalElement: Math.ceil(totalCourses / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoursesById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} not found` });
    }
    res
      .status(200)
      .json({ message: "Course retrieved successfully.", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });

    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} not found` });
    }

    res.status(200).json({
      message: `Course with id ${courseId} updated successfully`,
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} not found` });
    }

    res
      .status(200)
      .json({ message: `Course with id ${courseId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
