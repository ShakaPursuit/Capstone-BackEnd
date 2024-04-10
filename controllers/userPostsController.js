// Import Express
const express = require("express");
const userPosts = express.Router({ mergeParams: true });
const { getAllUserPosts, getAllUserPost } = require("../queries/posts");

const { authenticateToken } = require("../auth/auth");

// Get all posts from users
userPosts.get("/", authenticateToken, async (req, res) => {
  try {
    const { userprofile_id } = req.params;
    console.log(req.params);
    const posts = await getAllUserPosts(userprofile_id);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Post Not Found" });
  }
});

// Get a single post from users
userPosts.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id, userprofile_id } = req.params;
    console.log(req.params)
    const post = await getAllUserPost(id, userprofile_id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Post Not Found" });
  }
});

module.exports = userPosts;
