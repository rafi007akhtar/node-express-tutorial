const express = require("express");
const app = express();
console.clear();

const portToListen = process?.env?.port || 3000;
app.listen(portToListen, () => {
  console.log(`App running on port ${portToListen}`);
});

// the req, res, and next will automatically be supplied to the middleware
// by express
function logDetails(request, res, next) {
  console.log("middleware starts"); // 1

  const { method, url } = request;
  const year = new Date().getFullYear();
  console.log({ method, url, year });
  next(); // ALWAYS call this to get out of the middleware and into the next middleware / logic

  console.log("middleware ends"); // 4
}

app.get(
  "/",
  logDetails, // NOTE: this is the middleware here
  (request, res) => {
    console.log("home starts"); // 2
    res.send("Home");
    console.log("home ends"); // 3
  }
);

app.get("/about", logDetails, (request, res) => {
  res.send("About");
});
