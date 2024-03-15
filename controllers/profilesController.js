const express = require("express");
const profiles = express.Router();
require("dotenv").config();
// Package to generate tokens to authenticate users(profiles) when sending requests
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const {
  createProfile,
  getProfiles,
  logInProfile,
  updateProfile,
  deleteProfile,
  getProfile,
} = require("../queries/profiles");

const { checkFirstName, checkLastName } = require("../validations/checkName");

const goalsController = require("./goalsController");
profiles.use("/:userprofile_id/goals", goalsController);

const { authenticateToken } = require("../auth/auth");

// Get ALL profiles
profiles.get("/", authenticateToken, async (req, res) => {
  try {
    const profiles = await getProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
profiles.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await getProfile(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Create a new profile(signup)
profiles.post("/", authenticateToken, async (req, res) => {
  try {
    const newProfile = await createProfile(req.body);
    const token = jwt.sign(
      { userId: newProfile.userprofile_id, username: newProfile.username },
      secret
    );

    res.status(201).json({ user: newProfile, token });
  } catch (error) {
    res.status(500).json({ error: "Invalid Information", info: error });
  }
});

// Log into a profile
profiles.post("/login", authenticateToken, async (req, res) => {
  try {
    const profileLogin = await logInProfile(req.body);
    if (!profileLogin) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: profileLogin.userprofile_id, username: profileLogin.username },
      secret
    );
    res.status(200).json({
      user: {
        userprofile_id: profileLogin.userprofile_id,
        username: profileLogin.username,
        email: profileLogin.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Profile
profiles.put(
  "/:userprofile_id",
  authenticateToken,
  checkFirstName,
  checkLastName,
  async (req, res) => {
    try {
      const { userprofile_id } = req.params;
      const body = req.body;
      if (userprofile_id !== req.user.userId.toString()) {
        return res
          .status(403)
          .json({ error: "Forbidden - You can only acess your own profile" });
      }
      const updatedProfile = await updateProfile(userprofile_id, body);

      res.status(200).json(updatedProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete Profile
profiles.delete("/:userprofile_id", authenticateToken, async (req, res) => {
  try {
    const { userprofile_id } = req.params;
    const deletedProfile = await deleteProfile(userprofile_id);
    res.status(200).json({ success: "Successfully deleted profile" });
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
});

module.exports = profiles;
