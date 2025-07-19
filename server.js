const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler.js");
const corsOption = require("./config/corsOption.js");
const jwtVerify = require("./middleware/jwtVerify");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials.js");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection.js");
const { connect } = require("http2");

const PORT = process.env.PORT || 3500;

//connect db
connectDB();

//custom middlewares
app.use(logger);

app.use(credentials);

//cors
app.use(cors(corsOption));

//built in middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root.js"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/RefreshToken.js"));

app.use("/logout", require("./routes/Logout.js"));

app.use(jwtVerify);
app.use("/employee", require("./routes/api/employee.js"));
app.use("/user", require("./routes/api/user.js"));
app.use("/api/time", require("./routes/api/time.js"));
app.use("/api/payroll", require("./routes/api/payroll.js"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      error: "404 Not Found",
    });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, console.log(`server running on Port ${PORT}`));
});
