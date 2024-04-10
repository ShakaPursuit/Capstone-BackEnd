const express = require("express");
const posts = express.Router({ mergeParams: true });
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createLikes,
  deleteLikes,
} = require("../queries/posts");

// const userPostsController = require("./userPostsController")
// posts.use("/:userprofile_id/posts", userPostsController)

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

// Create(post) a post from users
posts.post("/", authenticateToken, async (req, res) => {
  try {
    const createdPost = await createPost(req.body);
    // console.log(req.body)
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500).json({ error: "Post Server Error" });
  }
});

// Liking(post) a post
posts.post("/like", async (req, res) => {
  try {
    const { userprofile_id, post_id } = req.body;
    const newLike = await createLikes(userprofile_id, post_id);
    res.status(200).json(newLike);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Unliking(delete) a post
posts.delete("/unlike", async (req, res) => {
  try {
    const { userprofile_id, post_id } = req.body;
    const unlike = await deleteLikes(userprofile_id, post_id);
    res.status(200).json({success: "Successfully deleted like"});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update(put) a post
posts.put("/:id", authenticateToken, async (req, res) => {
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
posts.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    res.status(200).json({ success: "Successfully deleted post" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = posts;
