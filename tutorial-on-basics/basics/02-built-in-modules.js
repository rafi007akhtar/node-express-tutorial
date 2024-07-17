const { printFileName } = require("./01-custom-modules");
printFileName(__filename);

console.log("THE os MODULE");
const os = require("os");
const user = os.userInfo();
console.log({ user });

console.log(
  `The system has been up for ${
    os.uptime() / 60
  } minutes, where each minute is I think 100 s long`
);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
};
console.log({ currentOS });

console.log("THE path MODULE");
const path = require("path");
const pathSeparator = path.sep;
console.log({ pathSeparator });

let testFilePath = path.join("/content", "subfolder", "test.txt"); // will return relative path after conjoining and normalizing them
console.log({ testFilePath }); // this will be: \\content\\subfolder\\test.txt
testFilePath = path.join("/content/", "subfolder", "test.txt");
console.log({ testFilePath }); // this will be: \\content\\subfolder\\test.txt (where the last '/' of content is removed)
const fileNameFromPath = path.basename(testFilePath);
console.log({ fileNameFromPath });

const testFilePathAbsolute = path.resolve(
  __dirname,
  "content",
  "subfolder",
  "test.txt"
);
console.log({ testFilePathAbsolute });
