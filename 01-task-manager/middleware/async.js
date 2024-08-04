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
  console.log(e);
  res.status(500).json({ msg: e });
}

module.exports = { asyncWrapper, errorHandler };
