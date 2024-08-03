function getAllTasks(request, res) {
  res.send("placeholder for all tasks.");
}

function createTask(request, res) {
  res.json(request.body);
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
