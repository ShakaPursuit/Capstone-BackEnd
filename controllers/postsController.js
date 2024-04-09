const express = require("express");
const posts = express.Router({ mergeParams: true });
const {
  getAllPosts,
  getPost,
} = require("../queries/posts");

const { authenticateToken } = require("../auth/auth");

// Get all posts from users
posts.get("/", async (req, res) => {
  try {
    // const { post_id } = req.params

    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Post Not Found" });
  }
});

// Get a single post from users
posts.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPost(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Post Not Found" });
  }
});

module.exports = posts;
