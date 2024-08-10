const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

async function authenticationMiddleware(request, res, next) {
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

  const { username, id } = decodedInfo;
  request.user = { username, id };

  next();
}

module.exports = authenticationMiddleware;
