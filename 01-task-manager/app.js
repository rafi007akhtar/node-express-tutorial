console.clear();

const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const router = require("./routes/tasks.routes");
const notFound = require("./middleware/not-found");

require("dotenv").config();
const port = process.env?.port || 3000;

const BASE_PATH = `/api/v1`;
const TASK_PATH = `${BASE_PATH}/tasks`;

app.use(express.static("./public"));
app.use(express.json());
app.use(TASK_PATH, router);
app.use(notFound);

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
