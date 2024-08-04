const { CustomAPIError } = require("../utils/error.utils");

function asyncWrapper(fn) {
  return async (request, res, next) => {
    try {
      await fn(request, res, next);
    } catch (e) {
      next(e);
    }
  };
}

async function errorHandler(err, request, res, next) {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err });
}

module.exports = { asyncWrapper, errorHandler };
