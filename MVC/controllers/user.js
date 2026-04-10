const User = require("../models/User");

//CRUD operations for User model

// Get all users
async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
}

// Create a new user
async function handleCreateUser(req, res) {
  const { username, jobTitle } = req.body;
  if (!username || !jobTitle) {
    return res.status(400).json({
      status: "fail",
      message: "Username and job title are required",
    });
  }
  const newUser = await User.create({ username, jobTitle });
  res.status(201).json({
    id: newUser._id,
    status: "success",
  });
}

// Get user by ID
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json(user);
}

// Delete user by ID
async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
}

// Update user by ID
async function handleUpdateUserById(req, res) {
  const { username, jobTitle } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, jobTitle },
    { new: true },
  );
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
  });
}

// Exporting all controller functions
module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
};
