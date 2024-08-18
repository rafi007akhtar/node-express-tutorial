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
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (e) {
    console.log({ e });
    res.status(500).send({ e });
  }
}

async function login(request, res) {
  const { email, password } = request.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("User with email does not exist");
  }

  const token = user.createJWT();
  const isPasswordCorrect = await user.verifyPassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid credentials");
  }

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

async function deleteAllUsers(request, res) {
  try {
    await User.deleteMany({});
    res.status(StatusCodes.OK).send("All users deleted");
  } catch (e) {
    console.error(e);
    res.json({ error: e.toString() });
  }
}

module.exports = { register, login, deleteAllUsers };
