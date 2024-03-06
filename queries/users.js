// Import db connection
const db = require("../db/dbConfig");

// Import library to hash password
const bcrypt = require("bcrypt");

// Create User
const createUser = async (user) => {
  try {
    const { username, email, password_hash, profile_id } = user;
    const salt = 10;
    const hash = await bcrypt.hash(password_hash, salt);
    const newUser = await db.one(
      "INSERT INTO user_accounts (username, email, password_hash, profile_id) VALUES($1, $2, $3, $4) RETURNING *",
      [username, email, hash, profile_id]
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

// Get All
const getUsers = async () => {
  try {
    const users = await db.any("SELECT * FROM user_accounts");
    return users;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

// Get Single
const getUser = async (id) => {
  try {
    const user = await db.one("SELECT * FROM user_accounts WHERE id=$1", id);
    return user;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

// Login User
const logInUser = async (user) => {
  try {
    // const { username, password } = user;
    const loggedInUser = await db.oneOrNone(
      "SELECT * FROM user_accounts WHERE username=$1",
      user.username
    );
    console.log(loggedInUser);
    if (!loggedInUser) {
      return false; // User not found
    }

    const passwordMatch = await bcrypt.compare(
      user.password_hash,
      loggedInUser.password_hash
    );

    if (!passwordMatch) {
      return false; // Password incorrect
    }
    return loggedInUser;
  } catch (error) {
    throw new Error("Failed to log in user: " + error.message);
  }
};

module.exports = { createUser, getUsers, getUser, logInUser };
