const express = require("express");
const connectDB = require("./config/db");
const logRequest = require("./middlewares/log");
const userRouter = require("./routes/user");
const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(logRequest("requestsLog.txt"));
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
