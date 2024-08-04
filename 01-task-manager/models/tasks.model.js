const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "cannot be empty"],
    trim: true,
    maxlength: [20, "cannot be longer than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
