require("dotenv").config();
require("./config");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}`);
});
