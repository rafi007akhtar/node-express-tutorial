const http = require("http");

const server = http.createServer(
  // this will be called everytime this server is hit
  (request, res) => {
    console.log("user hit the server");
    res.writeHead(200, {
      "content-type": "text/html", // so that the text sent gets formatted as HTML
      // "content-type": "text/plain", // here the text will be treated as pure text
    });
    res.write("<h1>Home page</h1>");
    res.end();
  }
);
server.listen(3000); // 443 is the selected port for 3000
