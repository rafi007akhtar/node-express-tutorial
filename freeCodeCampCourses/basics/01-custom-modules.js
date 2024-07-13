/**
 * Extract the file name from its path, print it, and return it.
 * @param {String} filePath the full file path
 */
function printFileName(filePath) {
  const lastSlashPos = filePath.lastIndexOf("\\");
  const fileName = filePath.substring(lastSlashPos + 1);
  console.log("\n");
  console.log({ fileName });
  return fileName;
}
printFileName(__filename); // this variable will not be exported

const SECRET = "this is a secret, non-exported string";
console.log({ SECRET });

// This variable will be exported
// NOTE: the `export` keyword will not work to export this object
// instead you need to use `module.exports`
const appConstants = {
  JOHN: "john",
  PETER: "peter",
};
Object.freeze(appConstants);

function sayHi(name) {
  console.log(`Hi, ${name}!`);
}

module.exports = { appConstants, printFileName, sayHi };
// For default export, write `module.exports = objName;`.
// For example, `module.exports = sayHi;`.

console.log(module.exports.appConstants);
