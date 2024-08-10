const CustomAPIError = require("../errors/custom-error");

async function login(request, res) {
  const { username, password } = request.body;
  if (!username?.length || !password?.length) {
    throw new CustomAPIError("Username and / or password not provided", 400);
  }

  res.send("Fake login / sign up / register route");
}

async function dashboard(request, res) {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome, user`,
    secret: `Your secret lucky number is: ${luckyNumber}`,
  });
}

module.exports = { login, dashboard };
