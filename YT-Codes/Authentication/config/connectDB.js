const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
}

module.exports = connectDB;
