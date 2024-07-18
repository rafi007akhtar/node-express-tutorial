const express = require("express");
const app = express();

const portToListen = process.port?.env || 3000;
app.listen(portToListen);
console.log(`Listening at ${portToListen}`);

app.get("/", (request, res) => {
  res.status(200).send("Home page");
});

app.get("/about", (request, res) => {
  res.status(200).send("About page");
});

app.all("*", (request, res) => {
  res.status(404).send("<h1>Error: page not found</h1>");
});
