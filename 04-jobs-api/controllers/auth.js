const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");

async function register(request, res) {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please enter name and email and password");
  }

  try {
    const user = await User.create({ ...request.body });
    res.status(StatusCodes.CREATED).json(user);
  } catch (e) {
    console.log({ e });
    res.status(500).send({ e });
  }
}

async function login(request, res) {
  res.send("TODO");
}

module.exports = { register, login };
