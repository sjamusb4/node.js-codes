const e = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env", quiet: true });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const organizationSchema = new mongoose.Schema({
  title: String,
  description: String,
  admin: mongoose.Types.ObjectId,
  members: [mongoose.Types.ObjectId],
});

const Organization = mongoose.model("Organization", organizationSchema);

const boardSchema = new mongoose.Schema({
  title: String,
  description: String,
  organizationId: mongoose.Types.ObjectId,
});

const Board = mongoose.model("Board", boardSchema);

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  boardId: mongoose.Types.ObjectId,
  state: {
    type: String,
    enum: ["ToDo", "In Progress", "Done", "Archived"],
    default: "ToDo",
  },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = { User, Organization, Board, Issue };
