const User = require("../models/user.model");

async function handleRegister(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res
      .status(201)
      .json({ _id: newUser._id, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

async function handleLogin(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
      password,
    });
    if (user) {
      res.status(200).json({ _id: user._id, message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}

module.exports = { handleRegister, handleLogin };
