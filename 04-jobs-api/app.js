console.clear();

require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const authGuard = require("./middleware/authentication");

// packages for security
const helmet = require("helmet"); // adds a bunch of headers for security purposes
const cors = require("cors"); // to configure which domains are allowed to access the server
const xss = require("xss-clean"); // to sanitize req.params, req.query and req.body
const rateLimit = require("express-rate-limit"); // to put limit for API requests

const express = require("express");
const app = express();
app.set("trust proxy", 1); // for publishing the app to Heroku

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware for security
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);
app.use([helmet(), cors(), xss()]);

app.use(express.json());

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
