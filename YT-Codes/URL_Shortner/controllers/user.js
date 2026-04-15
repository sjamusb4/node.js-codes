const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleRegisterUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await USER.create({ name, email, password });
    return res.redirect("/"); // Redirect to home page after successful registration
    //res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await USER.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //stateful authentication using cookies and in-memory session storage
    const sessionId = uuidv4();
    setUser(sessionId, user); // Store user session in memory
    res.cookie("sessionId", sessionId); // Set session cookie
    return res.redirect("/"); // Redirect to home page after successful login

    //res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { handleRegisterUser, handleLoginUser };
