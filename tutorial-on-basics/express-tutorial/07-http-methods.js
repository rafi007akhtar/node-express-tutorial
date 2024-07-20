const express = require("express");
const app = express();
console.clear();
app.listen(3000, () => console.log(`App running on port 3000.`));

app.use(express.static("./methods-public"));

// NOTE: the urlencoded middleware is needed to get the request body
// it is based on the body-parser middleware that was used earlier
app.use(express.urlencoded({ extended: false }));

// This middleware is to signal that the incoming data will be in JSON format
app.use(express.json());

// get the base path and routes for people from its routes file
const {
  BASE_PATH: peopleBasePath,
  router: peopleRouter,
} = require("./routes/people.routes"); // or: "./routes/peopleAlter.routes" to get alternative routes, but same results
// next: use a middleware to club the base path with its router
app.use(peopleBasePath, peopleRouter); // this clubs all routes starting with `/api/people` with its matching routes created by the router

// repeat the same for login, but this time I will hardcode the base path
const { router: loginRouter } = require("./routes/login.routes");
app.use("/login", loginRouter);
