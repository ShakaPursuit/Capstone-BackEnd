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
  

module.exports= {getAllPosts,getPost}