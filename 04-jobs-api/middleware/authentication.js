const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function authGuard(request, res, next) {
  const authHeader = request.headers.authorization || "";
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Token not provided or invalid");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = payload;
    request.body = { userId, name };
    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication failed:", e);
  }
}

module.exports = authGuard;
