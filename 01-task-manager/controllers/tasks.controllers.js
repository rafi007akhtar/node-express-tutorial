const Task = require("../models/tasks.model");

async function getAllTasks(request, res) {
  try {
    const allTasks = await Task.find({});
    res.status(200).json(allTasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e });
  }
}

async function createTask(request, res) {
  try {
    const task = await Task.create(request.body);
    res.status(201).json(task);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e });
  }
}

async function getTask(request, res) {
  try {
    const { id } = request.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }
    res.status(200).json(task);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e });
  }
}

async function updateTask(request, res) {
  try {
    const { id } = request.params;
    const { body } = request;
    const task = await Task.findByIdAndUpdate(id, body, { new: true });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }
    res.status(200).json(task);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e });
  }
}

async function deleteTask(request, res) {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }
    res.status(200).json(task);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e });
  }
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
