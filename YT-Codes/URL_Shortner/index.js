const express = require("express");
const connectDB = require("./config/connectDB");
const { router } = require("./routes/url");
const { handelRedirectToURL } = require("./controllers/url");

const app = express();
const PORT = 3000;
connectDB();

app.use(express.json());
app.use("/url", router);
app.get("/:shortId", handelRedirectToURL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
