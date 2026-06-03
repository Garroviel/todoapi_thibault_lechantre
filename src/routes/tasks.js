const express = require("express");
const fs = require("fs");
const path = require("path");
const { createTask } = require("../models/task");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]");
  }

  const data = fs.readFileSync(dataPath, "utf-8");

  if (!data.trim()) {
    return [];
  }

  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
}

router.post("/", (req, res) => {
  const { title, description, status } = req.body;

  if (!description) {
    return res.status(400).json({ error: "description is required" });
  }

  const tasks = readTasks();
  const task = createTask({ title, description, status });

  tasks.push(task);
  writeTasks(tasks);

  res.status(201).json(task);
});

router.get("/", (req, res) => {
  res.json(readTasks());
});

router.get("/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  writeTasks(tasks);

  res.json(tasks[index]);
});

router.delete("/:id", (req, res) => {
  const tasks = readTasks();
  const filteredTasks = tasks.filter((t) => t.id !== req.params.id);

  if (filteredTasks.length === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  writeTasks(filteredTasks);

  res.status(204).send();
});

module.exports = router;