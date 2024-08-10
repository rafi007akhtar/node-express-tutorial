const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/index");

async function login(request, res) {
  const { username, password } = request.body;
  if (!username?.length || !password?.length) {
    throw new BadRequestError("Username and / or password not provided");
  }

  const id = new Date().toISOString(); // this should be unique for each user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); // Do NOT send password here - it's a bad practise! Instead, send the unique key and a secret string

  res.status(200).json({ token, message: "user created" });
}

async function dashboard(request, res) {
  const { username } = request.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome, ${username}`,
    secret: `Your secret lucky number is: ${luckyNumber}`,
  });
}

module.exports = { login, dashboard };
