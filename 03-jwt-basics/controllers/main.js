const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

async function login(request, res) {
  const { username, password } = request.body;
  if (!username?.length || !password?.length) {
    throw new CustomAPIError("Username and / or password not provided", 400);
  }

  const id = new Date().toISOString(); // this should be unique for each user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); // Do NOT send password here - it's a bad practise! Instead, send the unique key and a secret string

  res.status(200).json({ token, message: "user created" });
}

async function dashboard(request, res) {
  const authHeader = request.headers.authorization || "";
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Token invalid or empty", 401);
  }

  const token = authHeader.split(" ")[1];
  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      msg: "Unable to verify token",
      err: e,
    });
  }

  const { username } = decodedInfo;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome, ${username}`,
    secret: `Your secret lucky number is: ${luckyNumber}`,
  });
}

module.exports = { login, dashboard };
