console.clear();

require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const authGuard = require("./middleware/authentication");
const express = require("express");
const app = express();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use(authGuard); // auth guard will be applied to all routes below this one (so the job routes)
app.use("/api/v1/jobs", jobsRouter); // alternatively: add the auth guard middleware as the second param here

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log("Trying to connect to DB...");
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");

    app.listen(port, () => console.log(`App running on port ${port}.`));
  } catch (error) {
    console.log(error);
  }
};

start();
