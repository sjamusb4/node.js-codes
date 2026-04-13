const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Hi from middleware 1");
  req.myData = { username: "Sourabh" };
  next();
});

app.use((req, res, next) => {
  console.log("Hi from middleware 2");
  console.log(req.myData);
  req.myData = { ...req.myData, age: 25 };
  next();
});

app.get("/", (req, res) => {
  return res.send({
    messsage: "Hi from sever!",
    data: req.myData,
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
