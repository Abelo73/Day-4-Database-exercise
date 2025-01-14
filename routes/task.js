const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { Types } = require("mongoose");

// Creating new task

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).send(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all tasks

router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    if (task.length === 0) {
      return res.status(404).json({
        message: `No task found`,
      });
    }
    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read one task



router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await Task.find({ _id: { $in: [id] } });
    if (tasks.length === 0) {
      return res.status(404).json({ error: error.message });
    }
    res.status(200).json({ message: `Tasks found with id ${id}`, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(parseInt(id), {
      new: true,
    });
    if (!updatedTask) {
      res.status(404).json({ message: `Task not found with id` });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete a task

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(240).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
