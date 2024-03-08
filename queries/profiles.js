// Import the connection to the database(db)
const db = require("../db/dbConfig");
// Import Library to hash password
const bcrypt = require("bcrypt");

const createProfile = async (profile) => {
  try {
    const { username, email, password_hash } = profile;
    const salt = 15;
    const hash = await bcrypt.hash(password_hash, salt);
    const newProfile = await db.one(
      "INSERT INTO user_profiles (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hash]
    );
    return newProfile;
  } catch (error) {
    return error;
  }
};

const getProfiles = async () => {
  try {
    const profiles = await db.any("SELECT * FROM user_profiles");
    return profiles;
  } catch (error) {
    return error;
  }
};

const logInProfile = async (profile) => {
  try {
    const loggedInProfile = await db.oneOrNone("SELECT * FROM user_profiles WHERE username=$1", profile.username)
    if(!loggedInProfile){
        return false
    }
    const passwordMatch = await bcrypt.compare(profile.password_hash, loggedInProfile.password_hash)
    if(!passwordMatch){
        return false
    }
    return loggedInProfile
  } catch (error) {
    return error
  }
};

module.exports = { createProfile, getProfiles, logInProfile };
