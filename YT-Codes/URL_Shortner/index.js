const express = require("express");
const path = require("path");
const connectDB = require("./config/connectDB");
const { router } = require("./routes/url");
const { staticRoute } = require("./routes/staticRouter");
const { handelRedirectToURL } = require("./controllers/url");
const URL = require("./models/url");

const app = express();
const PORT = 3000;
connectDB();

app.set("view engine", "ejs"); // Set the views directory for EJS templates / ejs is in simple words like its html and with some js code in it like php
app.set("views", path.resolve("./views")); // Set the views directory for EJS templates
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoute);
app.use("/url", router);
app.get("/:shortId", handelRedirectToURL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
