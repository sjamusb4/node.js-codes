const express = require("express");
const app = express();
const port = 3000;
let requestCount = 0;

function countRequestMiddleware(req, res, next) {
  requestCount++;
  next();
}

app.get("/", (req, res) => {
  res.send(`<h1>Total Request : ${requestCount}</h1>`);
});

app.get("/greet", countRequestMiddleware, (req, res) => {
  res.send(`<h1>Hello, ${req.query.name || "World"}!</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
