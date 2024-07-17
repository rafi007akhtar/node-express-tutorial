const http = require("http");
const fs = require("fs");

// const homepage = fs.readFileSync("./home.html");

const NAVBAR_ROOT_PATH = "./navbar-app";
const navbarHTML = fs.readFileSync(`${NAVBAR_ROOT_PATH}/index.html`);
const navbarCSS = fs.readFileSync(`${NAVBAR_ROOT_PATH}/styles.css`);
const navbarJS = fs.readFileSync(`${NAVBAR_ROOT_PATH}/browser-app.js`);
const navbarLogo = fs.readFileSync(`${NAVBAR_ROOT_PATH}/logo.svg`);

const server = http.createServer(
  // this will be called everytime this server is hit
  (request, res) => {
    console.log("user hit the server");
    let statusCode = 200;
    let templateCode = "";
    let contentType = "text/html";

    switch (request.url) {
      case "/":
        // templateCode = "<h1>This is the homepage</h1>";
        // templateCode = homepage;
        templateCode = navbarHTML;
        break;

      case "/styles.css":
        templateCode = navbarCSS;
        contentType = "text/css";
        break;

      case "/browser-app.js":
        templateCode = navbarJS;
        contentType = "text/javascript";
        break;

      case "/logo.svg":
        templateCode = navbarLogo;
        contentType = "image/svg+xml";
        break;

      case "/about":
        templateCode = "This is the about page";
        break;

      default:
        statusCode = 404;
        templateCode = `Oops, page not found. \nPlease try a different URL.`;
    }

    res.writeHead(statusCode, {
      "content-type": contentType, // so that the text sent gets formatted as HTML
      // "content-type": "text/plain", // here the text will be treated as pure text
    });
    res.write(templateCode);

    res.end();
  }
);
server.listen(3000); // 443 is the selected port for 3000
