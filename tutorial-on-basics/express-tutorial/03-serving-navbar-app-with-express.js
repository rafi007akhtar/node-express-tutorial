const express = require("express");
const app = express();
const path = require("path");

const portToListen = process.port?.env || 3000;
app.listen(portToListen, () => {
  console.log(`Listening at ${portToListen}`);
});

// NOTE: put public assets path in here, so they can be used by the endpoints when sending files
app.use(express.static("./public")); // this is a middleware

app.get("/", (request, res) => {
  // NOTE: if index.html is also added to public, you don't need to set up this endpoint
  // root url will always send index.html from the folder provided inside static in that case
  const pathToHTMLFile = path.resolve(__dirname, "./navbar-app/index.html");
  res.status(200).sendFile(pathToHTMLFile);
});

app.all("*", (request, res) => {
  res.status(404).send("<div>Not found</div>");
});
