const express = require("express");
const posts = express.Router({ mergeParams: true });
const { getAllPosts, getPost, createPost, updatePost, deletePost } = require("../queries/posts");

// get all posts from users
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

// get a single post from users
posts.get("/profile/:post_user_profile_id", async (req, res) => {
  try {
    const { post_user_profile_id } = req.params;
    const post = await getPost(post_user_profile_id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Post Not Found" });
  }
});
//create a post from users
posts.post("/", async (req, res) => {
  try {
    const createdPost = await createPost(req.body);
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500).json({ error: "Post Server Error" });
  }
});
// update a post 
posts.put("/profile/:post_user_profile_id/:post_id", async (req, res) => {
    try {
      const { post_user_profile_id, post_id } = req.params;
      const { post_img, description } = req.body;
      await updatePost(post_id, post_user_profile_id, post_img, description);
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  //delete a single post
  posts.delete("/profile/:post_user_profile_id/:post_id", async (req, res) => {
    try {
      const { post_user_profile_id, post_id } = req.params;
      await deletePost(post_user_profile_id, post_id);
      res.status(200).json({ success: "Successfully deleted post" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = posts;
