const mongoose = require("mongoose");

/**
 * Connect with the DB using Mongoose
 * @param {String} connectionURI The connection string to connect with the database
 * @returns {Object} object with `success` (`boolean`) and `err` (`undefined` if no error) attributes. If connection was successful, `success` would be `true`, otherwise `false`.
 */
async function connectDB(connectionURI) {
  let success = true,
    err;
  try {
    await mongoose.connect(connectionURI);
    console.log("Connected to MongoDB");
  } catch (e) {
    success = false;
    err = e;
  }
  return { success, err };
}

module.exports = connectDB;
