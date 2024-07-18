function logDetails(request, res, next) {
  const { method, url } = request;
  const year = new Date().getFullYear();
  console.log({ method, url, year });
  next();
}

function logHello(request, res, next) {
  console.log("Hello, world");
  next();
}

function logParticular(request, res, next) {
  console.log("Hello in particular");
  next();
}

function insideAPI(r1, r2, next) {
  console.log("Inside API URL");
  next();
}

const AUTHORIZED_USERS = ["rafi", "akhtar"];
function authGuard(request, res, next) {
  const user = request?.query?.name?.toLowerCase();
  if (user && AUTHORIZED_USERS.includes(user)) {
    console.log(`${user} was allowed to accesse the server`);
    next();
  } else {
    res.status(401).send("You are not allowed to access this endpoint.");
  }
}

module.exports = { logDetails, logHello, logParticular, insideAPI, authGuard };
