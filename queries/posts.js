const db = require("../db/dbConfig");

const getAllPosts = async () => {
    try {
      const posts = await db.many("SELECT * FROM posts");
      return posts;
    } catch (error) {
      return error;
    }
  };

  const getPost = async (post_user_profile_id) => {
    try {
      const posts = await db.query(
        "SELECT * FROM posts WHERE post_user_profile_id = $1",
        [post_user_profile_id]
      );
      return posts;
    } catch (error) {
      throw error;
    }
  };
  const createPost = async (post) => {
    try {
      const { post_user_profile_id, description} =
        post;
      const newPost = await db.one(
        "INSERT INTO posts( post_user_profile_id, description) VALUES ($1, $2) RETURNING *",
        [ post_user_profile_id, description]
      );
      return newPost;
    } catch (error) {
      return error;
    }
  };
  
 
  const updatePost = async (post_id, post_user_profile_id, post_img, description) => {
    try {
      await db.none(
        "UPDATE posts SET post_img=$1, description=$2 WHERE post_id=$3 AND post_user_profile_id=$4",
        [post_img, description, post_id, post_user_profile_id]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
 
  const deletePost = async (post_user_profile_id, post_id) => {
    try {
      await db.none(
        "DELETE FROM posts WHERE post_id = $1 AND post_user_profile_id = $2",
        [post_id, post_user_profile_id]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

module.exports= {getAllPosts,getPost,createPost, updatePost, deletePost}

