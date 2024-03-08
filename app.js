const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const usersController = require("./controllers/usersController.js");
const profilesController = require("./controllers/profilesController.js");
// const { authenticateToken } = require("./auth/auth.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/users", usersController);
app.use("/profiles", profilesController);

app.get("/", (req, res) => {
  res.json({ index: "This is the index page" });
});

module.exports = app;
