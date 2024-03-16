// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const profilesController = require("./controllers/profilesController")
const goalsController=require("./controllers/goalsController")
const interestController=require("./controllers/interestController")
const postController=require('./controllers/postController')
// Middleware
app.use(cors());
app.use(express.json());
app.use("/profiles", profilesController)
app.use("/goals",goalsController)

app.use("/interests",interestController)
app.use("/posts",postController)

app.get("/", (req, res) => {
  res.json({ index: "This is the index page" });
});

app.get("*", (req, res) => {
  res.json({ error: "Page Not Found" });
});

module.exports = app;
