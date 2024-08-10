const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

async function authenticationMiddleware(request, res, next) {
  const authHeader = request.headers.authorization || "";
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Token invalid or empty");
  }

  const token = authHeader.split(" ")[1];
  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Unable to verify token",
      err: e,
    });
  }

  const { username, id } = decodedInfo;
  request.user = { username, id };

  next();
}

module.exports = authenticationMiddleware;
