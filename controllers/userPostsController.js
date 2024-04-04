// Import Express
const express = require("express");
const userPosts = express.Router();

const {
  getAllUserPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../queries/posts");

const { authenticateToken } = require("../auth/auth");

// Get all posts from users
userPosts.get("/", authenticateToken, async (req, res) => {
  try {
    // const { post_id } = req.params

    const posts = await getAllUserPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Post Not Found" });
  }
});

// Get a single post from users
userPosts.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPost(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Post Not Found" });
  }
});

// Create(post) a post from users
userPosts.post("/", authenticateToken, async (req, res) => {
  try {
    const createdPost = await createPost(req.body);
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500).json({ error: "Post Server Error" });
  }
});

// Update(put) a post
userPosts.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // const { post_img, description } = req.body;
    const updatedPost = await updatePost(id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: "Post Not Found" });
  }
});

// Delete a single post
userPosts.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    res.status(200).json({ success: "Successfully deleted post" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = userPosts;
