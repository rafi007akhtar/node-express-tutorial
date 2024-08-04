const Task = require("../models/tasks.model");
const { asyncWrapper } = require("../middleware/async");

const getAllTasks = asyncWrapper(async (request, res) => {
  const allTasks = await Task.find({});
  res.status(200).json(allTasks);
});

const createTask = asyncWrapper(async (request, res) => {
  const task = await Task.create(request.body);
  res.status(201).json(task);
});

const getTask = asyncWrapper(async function (request, res) {
  const { id } = request.params;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${id}` });
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async function (request, res) {
  const { id } = request.params;
  const { body } = request;
  const task = await Task.findByIdAndUpdate(id, body, { new: true });
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${id}` });
  }
  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async function (request, res) {
  const { id } = request.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${id}` });
  }
  res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
