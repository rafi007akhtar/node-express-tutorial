const utils = require("./01-custom-modules");
utils.printFileName(__filename);

// BASIC JS CODE
const amount = 7;
amount < 10 ? console.log("smol numnber") : console.log("big boi number");
console.log("Hello, world");
/* To run, open terminal in this path, and enter `node` followed by the filename:
```
node 01-basics.js
```
The file extension may also be skipped.
*/

// GLOBALS
/** The following are some of the globals in node (window object not needed to access them).
    __dirname  - path to current directory
    __filename - file name
    require    - function to use modules (CommonJS)
    module     - info about current module (file)
    process    - info about env where the program is being executed
 */
console.log({ __dirname, __filename });
// console.log({ process });

// MODULES
// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
console.log(utils.appConstants);
const { JOHN, PETER } = utils.appConstants;
// to get default exports, it will be something like `const sayHi = reqire('./modules.js');`
utils.sayHi(JOHN);
utils.sayHi(PETER);

// BUILT-IN MODULES
require("./02-built-in-modules");

// FILESYSTEMS
require("./03-filesystems");
