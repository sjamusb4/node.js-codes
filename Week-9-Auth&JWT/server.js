const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "Notes-App-Secret";
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] }),
);

const notes = [];
const users = [];
function authMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userExists = users.find((u) => u.userName === decoded.userName);

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

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });
// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/signup.html"));
// });

// app.get("/signin", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/signin.html"));
// });

//POST - crete user

app.post("/signup", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName?.trim() || !password?.trim()) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  const userExists = users.some((u) => u.userName === userName);
  if (userExists) {
    return res.status(400).json({
      error: "Username already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ userName, password: hashedPassword });
  res.status(201).json({
    message: "User Created Successfully!",
  });
});

//POST - sign in
app.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName?.trim() || !password?.trim()) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  const foundUser = users.find((u) => u.userName === userName);
  if (!foundUser) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userName }, JWT_SECRET, { expiresIn: "15m" });
  res.json({
    token,
  });
});

// POST - Create a note
app.post("/notes", authMiddleware, function (req, res) {
  const { title, description } = req.body;

  if (!title?.trim() || !description?.trim()) {
    return res.status(400).json({
      error: "Title and description required.",
    });
  }

  notes.push({ userName: req.userName, title, description });
  res.json({
    message: "Note Saved Successfully!",
  });
});

// GET - get all my notes
app.get("/notes", authMiddleware, function (req, res) {
  const currentUserNotes = notes.filter(
    (note) => note.userName === req.userName,
  );
  res.json({ notes: currentUserNotes });
});

app.listen(3000, () => {
  console.log("Sever is running on 3000");
});
