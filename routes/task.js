const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { Types } = require("mongoose");

const taskController = require("../controllers/taskController");

// Creating new task

router.post("/", taskController.createTask);

// Read all tasks

router.get("/", taskController.getAllTasks);

// Read one task

router.get("/:id", taskController.getTasksById);

// Update task

router.put("/:id", taskController.updateTaskById);

// Delete a task

router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
