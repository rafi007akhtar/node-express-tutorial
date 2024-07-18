const express = require("express");
const app = express();
console.clear();

const portToListen = process?.env?.port || 3000;
app.listen(portToListen, () => {
  console.log(`App running on port ${portToListen}`);
});

// import all required middleware
const {
  logDetails,
  logHello,
  logParticular,
  insideAPI,
  authGuard,
} = require("./middleware");

// setting up routes without middleware
app.get("/no-mid", (_, res) => {
  res.send("Details not logged since middleware not added yet");
});

// using app.use to add the common middleware for all routes henceforth
app.use(logDetails, logHello); // can also be placed in an array: `[logDetails, logHello]`

// the below routes will run the `logDetails` and `logHello` middleware without specifying it as a param
app.get("/", (request, res) => {
  res.send("Home");
});
app.get("/about", (request, res) => {
  res.send("About");
});
// the below route will run the common middleware as well as the particular middleware specified (for > 1, use an array)
app.get("/particular", logParticular, (request, res) => {
  res.send("Particular page");
});

// specify the URL path where the middleware would be executed
app.use("/api", insideAPI);

// only the routes starting with "/api" will run the `insideAPI` middleware
app.get("/api/home", (_, res) => {
  res.send("API home");
});
app.get("/not/api/home", (_, res) => {
  res.send("Not API home");
});

// PROTECTING ROUTES - /user shall only be accessible for valid users
app.use("/user", authGuard);
app.get("/user", (request, res) => {
  // Example allowed user endpoint: http://localhost:3000/user?name=rafi
  res.send(`Welcome, ${request.query.name}.`);
});

// NOTE: refer to ./final/10-middleware-options.js to see the syntax for using third-party middleware
