const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
} = require("../controllers/tasks.controllers");

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
