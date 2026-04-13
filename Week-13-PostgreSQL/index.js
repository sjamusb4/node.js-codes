const { Pool } = require("pg");
const express = require("express");
const app = express();

const pool = new Pool({
  connectionString: "",
});

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id", // Use parameterized query to prevent SQL injection
    [username, email, password],
  );

  //RETURNING id allows us to get the id of the newly inserted user without needing a separate query

  //dont use template literals for SQL queries as it can lead to SQL injection vulnerabilities

  //vulnerable to SQL injection
  //   console.log(
  //     `insert into users (username, email, password) values ('${username}', '${email}', '${password}')`,
  //   );
  //   const result = await pool.query(
  //     `insert into users (username, email, password) values ('${username}', '${email}', '${password}')`,
  //   );

  res
    .status(201)
    .json({ id: result.rows[0].id, message: "User registered successfully" });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password],
  );
  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = "fake-jwt-token";
  res.status(200).json({ token, message: "User logged in successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
