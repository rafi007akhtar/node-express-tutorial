const http = require("http");
const { env } = require("process");

const DEFAULT_PORT = 3000;

const server = http.createServer((request, response) => {
  response.write("Welcome to the sample application.\n");
  switch (request.url) {
    case "/":
      response.end("This is the homepage");
      break;
    case "/about":
      response.end("This is the about page");
      break;
    default:
      response.write(`Oops, page not found. \nPlease try a different URL.`);
      response.end();
  }
});

const portToListen = env.PORT || DEFAULT_PORT;
console.log({ portToListen });

server.listen(portToListen);
