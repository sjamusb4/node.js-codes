const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const z = require("zod");
const USER = require("./models/user");

const app = express();
app.use(express.json());

const JWT_SECRET = "myrandomsecretkey"; // In production, use environment variables to store secrets

const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

//POST - sign up
app.post("/signup", async (req, res) => {
  const { data, success, error } = signupSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({
      error: error.issues
        .map((issue) => issue.path + ": " + issue.message)
        .join(", "),
    });
  }

  const { username, password } = data;

  try {
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Username and password are required.",
      });
    }

    const userExists = await USER.findOne({ username: username });
    if (userExists) {
      return res.status(400).json({
        error: "Username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await USER.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser._id,
      message: "User Created Successfully!",
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST - sign in
app.post("/signin", async (req, res) => {
  const { data, success, error } = signupSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({
      error: error.issues
        .map((issue) => issue.path + ": " + issue.message)
        .join(", "),
    });
  }

  const { username, password } = data;

  try {
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Username and password are required.",
      });
    }

    const foundUser = await USER.findOne({ username: username });
    if (!foundUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, message: "Sign in successful!" });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
