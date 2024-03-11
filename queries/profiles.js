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
const getProfile = async (id) => {
  try {
    const user = await db.one("SELECT * FROM user_profiles WHERE userprofile_id=$1",id);
    return user;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

const logInProfile = async (profile) => {
  try {
    const loggedInProfile = await db.oneOrNone(
      "SELECT * FROM user_profiles WHERE username=$1",
      profile.username
    );
    if (!loggedInProfile) {
      return false;
    }
    const passwordMatch = await bcrypt.compare(
      profile.password_hash,
      loggedInProfile.password_hash
    );
    if (!passwordMatch) {
      return false;
    }
    return loggedInProfile;
  } catch (error) {
    return error;
  }
};

const updateProfile = async (userprofile_id, profile) => {
  try {
    const { firstname, lastname, profile_img, age, gender, bio } = profile;
    const updatedProfile = await db.one(
      "UPDATE user_profiles SET firstname=$1, lastname=$2, profile_img=$3, age=$4, gender=$5, bio=$6 WHERE userprofile_id=$7 RETURNING *",
      [firstname, lastname, profile_img, age, gender, bio, userprofile_id]
    );
    // console.log(updatedProfile);
    return updatedProfile;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteProfile = async (id) => {
  try {
    const deletedProfile = await db.one(
      "DELETE FROM user_profiles WHERE userprofile_id=$1 RETURNING *",
      id
    );
    return deletedProfile;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createProfile,
  getProfiles,
  logInProfile,
  updateProfile,
  deleteProfile,
  getProfile
};
