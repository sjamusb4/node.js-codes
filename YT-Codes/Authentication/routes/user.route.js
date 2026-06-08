const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {
  handleRegister,
  handleLogin,
} = require("../controllers/user.controller");

//
router.post("/register", handleRegister);
router.post("/login", handleLogin);

module.exports = { authRouter: router };
