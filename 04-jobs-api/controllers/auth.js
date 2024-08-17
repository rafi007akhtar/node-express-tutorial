const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BadRequestError } = require("../errors");

async function register(request, res) {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please enter name and email and password");
  }

  try {
    const user = await User.create({ ...request.body });
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (e) {
    console.log({ e });
    res.status(500).send({ e });
  }
}

async function login(request, res) {
  res.send("TODO");
}

module.exports = { register, login };
