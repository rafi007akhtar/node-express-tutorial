const EventEmitter = require("events");

const SAMPLE_EVT_NAME = "sample-event";
const customEmitter = new EventEmitter();

// STEP 01: first listen for the event
customEmitter.on(SAMPLE_EVT_NAME, () => {
  console.log("sample response 1");
});
customEmitter.on(SAMPLE_EVT_NAME, (firstArg, secondArg) => {
  console.log(`sample response 2 with ${firstArg} and ${secondArg}`);
});
// STEP 02: then fire the event (this order is imp; reverse will not work)
customEmitter.emit(SAMPLE_EVT_NAME);
customEmitter.emit(SAMPLE_EVT_NAME, "Winds", "Words");

// Creating an HTTP server to LISTEN for a request instead of invoking w/ a callback
const http = require("http");
const server = http.createServer();
server.on("request", (request, res) => {
  res.end(
    "This server is running through `on` instead of callback during invokation."
  );
});
server.listen(3000);
