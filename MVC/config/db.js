const mongoose = require("mongoose");

async function connectDB() {
  return mongoose
    .connect("")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
}

module.exports = connectDB;
