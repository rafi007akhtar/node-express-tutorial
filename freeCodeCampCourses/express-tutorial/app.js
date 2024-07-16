const http = require("http");

const server = http.createServer(
  // this will be called everytime this server is hit
  (request, res) => {
    console.log("user hit the server");
    let statusCode = 200;
    let templateCode = "";

    switch (request.url) {
      case "/":
        templateCode = "<h1>This is the homepage</h1>";
        break;

      case "/about":
        templateCode = "This is the about page";
        break;

      default:
        statusCode = 404;
        templateCode = `Oops, page not found. \nPlease try a different URL.`;
    }

    res.writeHead(statusCode, {
      "content-type": "text/html", // so that the text sent gets formatted as HTML
      // "content-type": "text/plain", // here the text will be treated as pure text
    });
    res.write(templateCode);

    res.end();
  }
);
server.listen(3000); // 443 is the selected port for 3000
