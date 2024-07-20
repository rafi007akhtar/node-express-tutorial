const express = require("express");
const router = express.Router();

// parent path must be /login for this to match
router.post("/", (request, res) => {
  console.log(request.body);

  request.body?.name
    ? res.status(200).send(`Welcome, ${request.body.name}`)
    : res.status(401).send("Please enter a name.");
});

module.exports = { router };
