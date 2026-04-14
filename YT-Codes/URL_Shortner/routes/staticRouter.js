const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/analytics", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("analytics", { urls: allURLs });
});

router.get("/", async (req, res) => {
  return res.render("home");
});
module.exports = { staticRoute: router };
