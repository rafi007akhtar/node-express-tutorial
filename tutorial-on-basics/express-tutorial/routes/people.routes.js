const express = require("express");
const router = express.Router();
const BASE_PATH = "/api/people";

const {
  getPeople,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people.controllers");

// the result route will be a combination of the parent route + this route
router.get("/", getPeople);

router.post("/", addPerson);

// if the parent route is /api/people, this route will be /api/people:id
router.put("/:id", updatePerson);

router.delete("/:id", deletePerson);

module.exports = { BASE_PATH, router };
