
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' , quiet: true });
const {User} = require('./model/model');
const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const dbURI = process.env.MONGODB_URI;


mongoose.connect(dbURI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log(err));

function authMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userExists = User.findOne({ username: decoded.userName });

    console.log(userExists);
    

    if (userExists) {
      req.userName = decoded.userName;
      next();
    } else {
      res.status(403).json({ message: "Invalid token payload" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

app.get('/',authMiddleware,(req,res)=>{
    res.send("Server is OK");
})

//POST - sign up
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    return res.status(400).json({
      error: "Username already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = new User({ username: userName, password: hashedPassword });
  // await newUser.save();
  
  await User.create({ username: username, password: hashedPassword });
  res.status(201).json({
    message: "User Created Successfully!",
  });
});

//POST - sign in
app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({
    token,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on 3000");
});
