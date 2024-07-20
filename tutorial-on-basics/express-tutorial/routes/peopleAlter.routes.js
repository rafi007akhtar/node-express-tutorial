const express = require("express");
const router = express.Router();
const BASE_PATH = "/api/people";

const {
  getPeople,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people.controllers");

// Alternative syntax to setup the routers, by chaining
router.route("/").get(getPeople).post(addPerson);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = { BASE_PATH, router };
