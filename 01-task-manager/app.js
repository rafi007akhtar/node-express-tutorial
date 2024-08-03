console.clear();

const express = require("express");
const app = express();
const router = require("./routes/tasks.routes");
const port = process.env?.port || 3000;

const BASE_PATH = `/api/v1`;
const TASK_PATH = `${BASE_PATH}/tasks`;

app.use(express.json());
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.get("/hello", (request, res) => {
  res.send("Task manager app");
});

app.use(TASK_PATH, router);
