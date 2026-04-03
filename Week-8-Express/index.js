const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // json parser middleware // updates body to req.body with json data

app.use(function greet(req, res, next) {
  console.log("Hi from server");
  next();
});

// app.use(greet) means => app.use('/',greet); // for all routes
app.use((req, res, next) => {
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// query parameter
// //http://localhost:3000/add?a=10&b=5
// app.get("/add", (req, res) => {
//   const a = parseInt(req.query.a); // by default its string
//   const b = parseInt(req.query.b);
//   const sum = a + b;

//   res.json({ sum: sum }); // to send JSON

//   //res.send(sum.toString()); // to send string

//   //we can't use res.send() twice means single req get single response

//   //res.send(`<h1>${sum}</h1>`); // to send HTML
// });

// //path parameter
// //http://localhost:3000/add/55/70
// app.get("/add/:a/:b", (req, res) => {
//   const a = parseInt(req.params.a);
//   const b = parseInt(req.params.b);
//   const sum = a + b;
//   res.json({ sum: sum });
// });

//data from body
//http://localhost:3000/add
app.get("/add", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  const sum = a + b;
  res.json({ sum: sum });
});

app.get("/sub", (req, res) => {});
app.get("/div", (req, res) => {});
app.get("/mul", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
