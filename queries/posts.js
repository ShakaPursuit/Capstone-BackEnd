const db = require("../db/dbConfig");

const getAllPosts = async () => {
  try {
    const posts = await db.any(
      "SELECT user_profiles.profile_img, user_profiles.username, posts.post_id, posts.*, likes_info.users_who_liked FROM posts JOIN user_profiles ON posts.userprofile_id = user_profiles.userprofile_id LEFT JOIN (SELECT post_id, array_agg(userprofile_id) AS users_who_liked FROM likes GROUP BY post_id) AS likes_info ON likes_info.post_id = posts.post_id"
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
    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllUserPost = async (id, userprofile_id) => {
  try {
    const post = await db.one(
      "SELECT user_profiles.profile_img, user_profiles.username, posts.* FROM posts JOIN user_profiles ON posts.userprofile_id=user_profiles.userprofile_id WHERE posts.post_id=$1 AND posts.userprofile_id=$2",
      [id, userprofile_id]
    );
    const postComments = await db.any(
      "SELECT * FROM comments WHERE post_id=$1",
      id
    );
    post.comments = postComments;
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createLikes = async (userprofile_id, post_id) => {
  try {
    const newLike = await db.one(
      "INSERT INTO likes (userprofile_id, post_id) VALUES ($1, $2) RETURNING *",
      [userprofile_id, post_id]
    );
    return "Liked successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteLikes = async (userprofile_id, post_id) => {
  try {
    const unlike = await db.none(
      "DELETE FROM likes WHERE userprofile_id=$1 AND post_id=$2",
      [userprofile_id, post_id]
    );
    return "Like deleted successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPost = async (post_id) => {
  try {
    const post = await db.one(
      "SELECT user_profiles.profile_img, user_profiles.username, posts.post_id, posts.*, likes_info.users_who_liked FROM posts JOIN user_profiles ON posts.userprofile_id=user_profiles.userprofile_id  LEFT JOIN (SELECT post_id, array_agg(userprofile_id) AS users_who_liked FROM likes GROUP BY post_id) AS likes_info ON likes_info.post_id = posts.post_id WHERE posts.post_id=$1",
      [post_id]
    );
    const postComments = await db.any(
      "SELECT * FROM comments WHERE post_id=$1",
      post_id
    );
    post.comments = postComments;
    return post;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    return error;
  }
};

const getComments = async (post_id) => {
  try {
    const comments = await db.any(
      "SELECT * FROM comments WHERE post_id=$1",
      post_id
    );
    return comments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllUserPosts,
  getAllPosts,
  getAllUserPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createLikes,
  deleteLikes,
  getComments,
};
