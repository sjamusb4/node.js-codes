const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");
const { User, Organization, Board, Issue } = require("./models");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

//POST CREATE User
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    res.status(411).json({
      message: "User with this username already exists",
    });
    return;
  }

  const newUser = await User.create({
    username: username,
    password: password,
  });

  res.json({
    id: newUser._id,
    message: "You have signed up successfully",
  });
});

//POST Login User - Get Token
app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await User.findOne({
    username: username,
    password: password,
  });
  if (!userExists) {
    res.status(403).json({
      message: "Incorrect credentials",
    });
    return;
  }

  const token = jwt.sign({ userId: userExists._id }, "myTrelloApp");
  res.json({ token });
});

// AUTHENTICATED ROUTE - MIDDLEWARE
// POST - Create ORG
app.post("/organization", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const newOrg = await Organization.create({
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: [userId],
  });

  res.json({
    id: newOrg._id,
    message: "Organization is created",
  });
});

// POST - Add Member to ORG
app.post("/add-member-to-organization", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUserUsername = req.body.memberUserUsername;

  const currentOrg = await Organization.findOne({ _id: organizationId });
  console.log(currentOrg.admin); // it is objectId();

  if (!currentOrg || currentOrg.admin.toString() !== userId) {
    res.status(411).json({
      message:
        "Either this org doesnt exist or you are not an admin of this org",
    });
    return;
  }

  const memberUser = await User.findOne({ username: memberUserUsername });

  if (!memberUser) {
    res.status(411).json({
      message: "No user with this username exists in our db",
    });
    return;
  }

  //organization.members.push(memberUser.id);

  // OPTION 1: The "Direct" Way (Best if you only have the ID)
  // Fast, efficient, and doesn't require fetching the document first.
  //   await Organization.updateOne(
  //     { _id: organizationId },
  //     { $push: { members: memberUser._id } },
  //   );

  // OPTION 2: The "Mongoose" Way (Best if you already have the document)
  // If 'currentOrg' is already a fetched document, use .save() to trigger
  // schema validations and middleware.
  //   currentOrg.members.push(memberUser._id);
  //   await currentOrg.save();

  // OPTION 3: The "Return" Way (Best if you need the updated data back)
  //   const updatedOrg = await Organization.findByIdAndUpdate(
  //     organizationId,
  //     { $push: { members: memberUser._id } },
  //     { new: true }, // Returns the document AFTER the push
  //   );

  // OPTION 4:
  // Good for: Quick updates on an object you already have
  //   await currentOrg.updateOne({
  //     $push: { members: memberUser._id },
  //   });

  // OPTION 4.1: no duplicate values
  const result = await currentOrg.updateOne({
    $addToSet: { members: memberUser._id },
  });

  // OPTION 5
  // currentOrg.members.push(memberUser._id);
  // await currentOrg.save();

  if (result.modifiedCount === 0) {
    return res
      .status(400)
      .json({ message: "User is already a member of this organization." });
  } else {
    return res.status(200).json({ message: "Member added successfully!" });
  }
});

// POST - Create Board
app.post("/board", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const description = req.body.description;
  const organizationId = req.body.organizationId;

  const currentOrg = await Organization.findById({ _id: organizationId });
  if (!currentOrg) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const isAdmin = currentOrg.admin.toString() === userId;
  const isMember = currentOrg.members.some((id) => id.toString() === userId);

  if (!isAdmin || !isMember) {
    return res.status(403).json({
      message: "Access denied: You must be a member or admin",
    });
  }

  const newBoard = await Board.create({ title, description, organizationId });

  res.json({
    id: newBoard._id,
    message: "Board is created",
  });
});

// POST - Create Issue
app.post("/issue", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { title, description, boardId } = req.body;

  const currentBoard = await Board.findById({ _id: boardId });
  if (!currentBoard) {
    return res
      .status(404)
      .json({ message: "Board not found or not in this organization" });
  }
  const orgId = currentBoard.organizationId;

  const currentOrg = await Organization.findById(orgId);
  if (!currentOrg) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const isAdmin = currentOrg.admin.toString() === userId;
  const isMember = currentOrg.members.some((id) => id.toString() === userId);

  if (!isAdmin || !isMember) {
    return res.status(403).json({
      message: "Access denied: You must be a member or admin",
    });
  }

  const newIssue = await Issue.create({ title, description, boardId });

  res.json({
    id: newIssue._id,
    message: "Issue is created",
  });
});

//GET Endpoints
// GET - Get ORG
app.get("/organization", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organizationId = req.query.organizationId;

  const currentOrg = await Organization.findById(organizationId);

  if (!currentOrg) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const isAdmin = currentOrg.admin.toString() === userId;
  const isMember = currentOrg.members.some((id) => id.toString() === userId);

  if (!isAdmin || !isMember) {
    return res.status(403).json({
      message: "Access denied: You must be a member or admin",
    });
  }

  const members = await User.find({ _id: currentOrg.members });

  res.json({
    organization: {
      title: currentOrg.title,
      description: currentOrg.description,
      admin: currentOrg.admin,
      members: members.map((m) => ({
        id: m.id,
        username: m.username,
      })),
    },
  });
});

// GET - Get Boards
app.get("/boards", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organizationId = req.query.organizationId;

  const currentOrg = await Organization.findById({ _id: organizationId });
  if (!currentOrg) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const isAdmin = currentOrg.admin.toString() === userId;
  const isMember = currentOrg.members.some((id) => id.toString() === userId);

  if (!isAdmin || !isMember) {
    return res.status(403).json({
      message: "Access denied: You must be a member or admin",
    });
  }
  const allBoards = await Board.find({ organizationId: organizationId });
  res.status(200).json({ boards: allBoards });
});

// GET - Get Issue
app.get("/issues", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { boardId } = req.query;

  const currentBoard = await Board.findById(boardId);
  if (!currentBoard) {
    return res.status(404).json({ message: "Board not found" });
  }
  const organizationId = currentBoard.organizationId;

  const currentOrg = await Organization.findById({ _id: organizationId });
  if (!currentOrg) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const isAdmin = currentOrg.admin.toString() === userId;
  const isMember = currentOrg.members.some((id) => id.toString() === userId);

  if (!isAdmin && !isMember) {
    return res.status(403).json({
      message: "Access denied: You must be a member or admin",
    });
  }
  const allIssues = await Issue.find({ boardId: boardId });
  res.status(200).json({ Issues: allIssues });
});

// GET - Get Member
app.get("/members", authMiddleware, async (req, res) => {});

//UPDATE Issues
app.put("/issue", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { title, description, state } = req.body;
  const { issueId } = req.query;

  const currentIssue = await Issue.findById(issueId);
  if (!currentIssue) {
    return res.status(404).json({ message: "Isuue not found" });
  }

  const currentBoard = await Board.findById(currentIssue.boardId);
  if (!currentBoard) {
    return res.status(404).json({ message: "Board not found" });
  }

  const currentOrg = await Organization.findById({
    _id: currentBoard.organizationId,
  });
  if (!currentOrg) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const isAdmin = currentOrg.admin.toString() === userId;
  const isMember = currentOrg.members.some((id) => id.toString() === userId);

  if (!isAdmin && !isMember) {
    return res.status(403).json({
      message: "Access denied: You must be a member or admin",
    });
  }

  await Issue.findByIdAndUpdate(issueId, {
    title: title,
    description: description,
    state: state,
  });

  res.status(200).json({ message: "Issue is updated" });
});

//DELETE -- FIND THE GBUG and fix it
app.delete("/members", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUserUsername = req.body.memberUserUsername;

  const currentOrg = await Organization.findOne({ _id: organizationId });

  if (!currentOrg || currentOrg.admin.toString() !== userId) {
    res.status(411).json({
      message:
        "Either this org doesnt exist or you are not an admin of this org",
    });
    return;
  }

  const memberUser = await User.findOne({ username: memberUserUsername });
  console.log(memberUser._id);

  if (!memberUser) {
    res.status(411).json({
      message: "No user with this username exists in our db",
    });
    return;
  }

  const result = await Organization.updateOne(
    { _id: organizationId },
    { $pull: { members: memberUser._id } },
  );

  //   OPTION 2
  //   currentOrg.members = currentOrg.members.filter((id) => id.toString() !== memberUser._id.toStirng());
  //   await currentOrg.save();

  if (result.modifiedCount === 0) {
    return res
      .status(404)
      .json({ message: "Member not found or already removed." });
  }
  res.json({
    message: "Member deleted!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
