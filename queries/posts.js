const db = require("../db/dbConfig");

const getAllPosts = async () => {
  try {
    const posts = await db.any(
      "SELECT user_profiles.profile_img, user_profiles.username, posts.* FROM posts JOIN user_profiles ON posts.userprofile_id=user_profiles.userprofile_id"
    );
    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllUserPosts = async (userprofile_id) => {
  try {
    const posts = await db.any(
      "SELECT user_profiles.profile_img, user_profiles.username, posts.* FROM posts JOIN user_profiles ON posts.userprofile_id=user_profiles.userprofile_id WHERE posts.userprofile_id=$1",
      [userprofile_id]
    );
    console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPost = async (post_id) => {
  try {
    const post = await db.one(
      "SELECT user_profiles.profile_img, user_profiles.username, posts.* FROM posts JOIN user_profiles ON posts.userprofile_id=user_profiles.userprofile_id WHERE posts.post_id=$1",
      [post_id]
    );
    const postComments = await db.any(
      "SELECT * FROM comments WHERE post_id=$1",
      post_id
    );
    post.comments = postComments;
    return post;
  } catch (error) {
    return error;
  }
};
const createPost = async (post) => {
  try {
    const { post_img, post_description, userprofile_id } = post;
    const newPost = await db.one(
      "INSERT INTO posts (post_img, post_description, userprofile_id) VALUES ($1, $2, $3) RETURNING *",
      [post_img, post_description, userprofile_id]
    );
    return newPost;
  } catch (error) {
    return error;
  }
};

const updatePost = async (id, post) => {
  try {
    const { post_img, post_description, userprofile_id } = post;
    const updatedPost = await db.one(
      "UPDATE posts SET post_img=$1, post_description=$2, userprofile_id=$3 WHERE post_id=$4 RETURNING *",
      [post_img, post_description, userprofile_id, id]
    );
    return updatedPost;
  } catch (error) {
    return error;
  }
};

const deletePost = async (id) => {
  try {
    const deletedPost = await db.none(
      "DELETE FROM posts WHERE post_id=$1 RETURNING *",
      id
    );
    return deletedPost;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllUserPosts,
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
