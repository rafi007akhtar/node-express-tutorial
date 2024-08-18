const express = require("express");
const authRouter = express.Router();
const { login, register, deleteAllUsers } = require("../controllers/auth");

authRouter.route("/login").post(login);
authRouter.route("/register").post(register);
authRouter.route("/deleteAll").delete(deleteAllUsers);

module.exports = authRouter;
