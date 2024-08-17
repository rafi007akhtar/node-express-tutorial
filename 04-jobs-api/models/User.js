const mongoose = require("mongoose");

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

const User = mongoose.model("User", UserSchema);

module.exports = User;
