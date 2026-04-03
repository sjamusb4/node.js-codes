const express = require("express");
const app = express();
const port = 3000;

function printLogs(req, res, next) {
  console.log(new Date().toLocaleString() + " Method - " + req.method);
  console.log(new Date().toLocaleString() + " Route - " + req.path);
  next();
}
app.use(printLogs);

app.get("/greet", (req, res) => {
  res.send(`<h1>Hello, ${req.query.name || "World"}!</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
