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

const { people } = require("./data");
app.get("/api/people", (request, res) => {
  res.json(people);
});
app.post("/api/people", (request, res) => {
  const { name } = request.body;
  if (!name) {
    res.status(401).json({
      success: false,
      msg: "Please enter a name",
    });
  } else {
    res.status(201).json({
      success: true,
      person: name,
    });
  }
});

app.post("/login", (request, res) => {
  console.log(request.body);

  request.body?.name
    ? res.status(200).send(`Welcome, ${request.body.name}`)
    : res.status(401).send("Please enter a name.");
});

app.put("/api/people/:id", (request, res) => {
  const { id } = request.params;
  const { name } = request.body;
  let personInd = -1;
  const personToUpdate = people.find((person, ind) => {
    if (person.id === +id) {
      personInd = ind;
      return true;
    }
  });
  if (!personToUpdate) {
    return res.status(401).send("Error: person not found");
  }

  const newPerson = { id, name };
  const updatedPeople = [...people];
  updatedPeople.splice(personInd, 1, newPerson);
  console.log({ updatedPeople });
  return res.status(200).json(updatedPeople);
});

app.delete("/api/people/:id", (request, res) => {
  const id = request?.params?.id;
  const updatedPeople = people.filter((person) => person.id !== +id);
  res.status(200).json(updatedPeople);
});
