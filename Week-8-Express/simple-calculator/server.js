const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

//app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory to root route

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html")); // Serve the index.html file for the root route
});

app.post("/add", (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const result = num1 + num2;
  res.json({
    result: result,
  });
});

app.post("/sub", (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const result = num1 - num2;
  res.json({
    result: result,
  });
});

app.post("/div", (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const result = num1 / num2;
  res.json({
    result: result,
  });
});

app.post("/mul", (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const result = num1 * num2;
  res.json({
    result: result,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
