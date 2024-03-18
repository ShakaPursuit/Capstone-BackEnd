const express = require("express");
const posts = express.Router({ mergeParams: true });
const { getAllPosts, getPost } = require("../queries/posts.js");

posts.get("/", async (req, res) => {
  try {
    // const { post_id } = req.params;
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Posts Not Found" });
  }
});

// posts.get("/profile/:post_user_profile_id", async (req, res) => {
//   try {
//     const { post_user_profile_id } = req.params;
//     const post = await getPost(post_user_profile_id);
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ error: "Post Not Found" });
//   }
// });

posts.get("/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const post = await getPost(post_id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Post Not Found" });
  }
});

module.exports = posts;
