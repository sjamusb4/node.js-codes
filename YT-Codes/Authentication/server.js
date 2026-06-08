const express = require("express");
const { authRouter } = require("./routes/user.route");
const connectDB = require("./config/connectDB");
const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use("/user", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
