const express = require("express");
const {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .delete(handleDeleteUserById)
  .patch(handleUpdateUserById);

module.exports = router;
