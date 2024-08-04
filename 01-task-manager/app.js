console.clear();

const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const router = require("./routes/tasks.routes");

require("dotenv").config();
const port = process.env?.port || 3000;

const BASE_PATH = `/api/v1`;
const TASK_PATH = `${BASE_PATH}/tasks`;

app.use(express.json());

app.get("/hello", (request, res) => {
  res.send("Task manager app");
});

app.use(TASK_PATH, router);

async function start() {
  console.log("Trying to connect to DB...");
  const { err } = await connectDB(process.env.MONGO_URI);
  if (err) {
    console.error("Unable to connect to DB:", err);
    return;
  }

  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}

start();
