const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10; // higher the rounds, more secure the password, but requires more processing power

async function register(request, res) {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please enter name and email and password");
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  const encryptedUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...encryptedUser });
  res.status(StatusCodes.CREATED).json(user);
}

async function login(request, res) {
  res.send("TODO");
}

module.exports = { register, login };
