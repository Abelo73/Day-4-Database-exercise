const Student = require("../models/Student");
const Task = require("../models/Student");
const mongoose = require("mongoose");

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // check if email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: "Student registered successfully",
      student: savedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students.length) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({ message: "Student fetched successfully", students: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStudentsWithPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const totalElement = await Student.countDocuments();

    const students = await Student.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    if (!students.length) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({
      message: "Student fetched successfully",
      students: students,
      page,
      limit,
      totalElement: Math.ceil(totalElement),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with id ${studentId} Not found` });
    }
    res.status(200).json({ message: "Student found", student: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true }
    );
    console.log(updatedStudent);

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: `Student with id ${studentId} Not found` });
    }

    res.status(200).json({
      message: `Student updated successfully`,
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with id ${studentId} Not found` });
    }
    res
      .status(200)
      .json({ message: `Student with id ${studentId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
