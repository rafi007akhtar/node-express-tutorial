const fs = require("fs");
const util = require("util");

// set up constants
const PATH_TO_FIRST = "./content/first.txt";
const PATH_TO_SECOND = "./content/second.txt";
const PATH_FOR_WRITE = "./content/result-sync.text";

// through promises
const getTextPromise = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      err ? rej(err) : res(data);
    });
  });
};
getTextPromise(PATH_TO_FIRST)
  .then((val) => {
    console.log({ val });
  })
  .catch((err) => {
    console.error({ err });
  });

// through async / await
const getTextAsync = async () => {
  let result, err;
  try {
    result = await getTextPromise(PATH_TO_FIRST);
  } catch (e) {
    err = e;
    console.error({ err });
  }
  return result;
};
getTextAsync();

// through util.promisify
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);
async function performIO() {
  // ALTERNATIVELY: `const fs = require("fs").promises;`

  // use `await fs.readFile` if imported alternatively
  const first = await readAsync(PATH_TO_FIRST, "utf8");
  const second = await readAsync(PATH_TO_SECOND, "utf8");

  // use `await fs.writeFile` if imported alternatively
  await writeAsync(
    PATH_FOR_WRITE,
    `First file content: ${first} \nSecond file content: ${second}`
  );
}
performIO();
