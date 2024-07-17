const fs = require("fs");

const STREAM_CHUNK_SIZE_B = 50000; // 1000 will be 1 KB
const PATH_TO_BIG_FILE = "./content/big.txt";

console.clear();

const readStream = fs.createReadStream(PATH_TO_BIG_FILE, {
  highWaterMark: STREAM_CHUNK_SIZE_B,
  encoding: "utf8",
});
readStream.on("data", (chunk) => {
  console.log(chunk);
});
readStream.on("error", (err) => {
  console.error({ err });
});

const http = require("http");
http
  .createServer((request, res) => {
    console.log("Served big file");
    // instead of serving a big file all at once like so:
    // const text = fs.readFileSync(PATH_TO_BIG_FILE);
    // res.end(text);
    // serve it in chunks, like so:

    const readStream = fs.createReadStream(PATH_TO_BIG_FILE, {
      highWaterMark: STREAM_CHUNK_SIZE_B,
    });
    readStream.on("open", () => {
      // readStream.pipe returns a writable stream
      readStream.pipe(res);
    });
  })
  .listen(3000);
