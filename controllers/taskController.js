const Task = require("../models/Task");
const mongoose = require("mongoose");

// Create a new Task

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json({ message: "Task saved successfully", savedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with id number ${taskId} Not found` });
    }
    res.status(200).json({ message: "Tasks fetched successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with id ${taskId} Not found` });
    }
    res
      .status(200)
      .json({ message: `Task with id ${taskId} updated successfully`, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with id ${taskId} Not found` });
    }
    res
      .status(200)
      .json({ message: `Task with id ${taskId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
