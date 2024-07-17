const http = require("http");
const portToListen = process?.env?.port || 3000;
const BIG_NUM = 1000000000;

const server = http.createServer((request, res) => {
  switch (request.url) {
    case "/":
      res.end("This is the homepage");
      break;

    case "/about":
      for (let i = 0; i < BIG_NUM; i++) {}
      res.write("Blocked the code just to say: ");
      res.end("This is the about page");
      break;

    default:
      res.write(`Oops, page not found. \nPlease try a different URL.`);
      res.end();
  }
});

server.listen(portToListen, () => {
  console.log(`Server listening on port ${portToListen}`);
});
