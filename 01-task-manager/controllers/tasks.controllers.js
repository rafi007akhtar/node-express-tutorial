const Task = require("../models/tasks.model");

function getAllTasks(request, res) {
  res.send("placeholder for all tasks.");
}

async function createTask(request, res) {
  try {
    const task = await Task.create(request.body);
    res.status(201).json(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.toString());
  }
}

function getTask(request, res) {
  res.json({ id: request.params.id });
}

function updateTask(request, res) {
  res.send("update task");
}

function deleteTask(request, res) {
  res.send("delete task.");
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
