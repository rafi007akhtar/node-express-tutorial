const { printFileName } = require("./01-custom-modules");
printFileName(__dirname);

const fs = require("fs");

// SYNC
// read the files, display their text contents
const first = fs.readFileSync("./content/first.txt", "utf8"); // returns text content of this file
const second = fs.readFileSync("./content/second.txt", "utf8");
console.log({ first, second });

// create a file if it doesn't exist, and write the second argument in it
// if it exists, overwrite its contents with the second argument
const WRITTEN_FILE_PATH = "./content/result-sync.text";
fs.writeFileSync(
  WRITTEN_FILE_PATH,
  `First file content: ${first} \nSecond file content: ${second}`
);
// add a flag so that if text is there in the file, the new content is appended.
fs.writeFileSync(WRITTEN_FILE_PATH, "\nAnd this is some new content.", {
  flag: "a",
});

// ASYNC
fs.readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log({ result });
  const first = result;
  fs.readFile("./content/second.txt", "utf8", (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log({ result });
    const second = result;
    fs.writeFile(
      WRITTEN_FILE_PATH,
      `First file content: ${first} \nSecond file content: ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log({ result });
      }
    );
  });
});
