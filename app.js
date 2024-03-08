// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const profilesController = require("./controllers/profilesController")

// Middleware
app.use(cors());
app.use(express.json());
app.use("/profiles", profilesController)

app.get("/", (req, res) => {
  res.json({ index: "This is the index page" });
});

app.get("*", (req, res) => {
  res.json({ error: "Page Not Found" });
});

module.exports = app;
