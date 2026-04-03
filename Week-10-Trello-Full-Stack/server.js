
const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config();

const app = express();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log(err));


app.get('/',(reqq,res)=>{
    res.send("Server is OK");
})
app.listen(3000, () => {
  console.log("Sever is running on 3000");
});
