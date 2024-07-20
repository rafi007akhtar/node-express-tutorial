const { people } = require("../data");

const getPeople = (request, res) => {
  res.json(people);
};

const addPerson = (request, res) => {
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
};

const updatePerson = (request, res) => {
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
};

const deletePerson = (request, res) => {
  const id = request?.params?.id;
  const updatedPeople = people.filter((person) => person.id !== +id);
  res.status(200).json(updatedPeople);
};

module.exports = { getPeople, addPerson, updatePerson, deletePerson };
