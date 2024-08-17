const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10; // higher the rounds, more secure the password, but requires more processing power

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "not provided"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "not provided"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "not provided",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "not provided"],
    minlength: 6,
  },
});

// NOTE: in the below pre-save middleware, use a regular inline function, and NOT an arrow function
// Reason: the `this` keyword needs to point to the mongoose.Document
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
