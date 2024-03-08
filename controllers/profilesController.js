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
} = require("../queries/profiles");

const goalsController = require("./goalsController");
profiles.use("/:userprofile_id/goals", goalsController);

// Get ALL profiles
profiles.get("/", async (req, res) => {
  try {
    const profiles = await getProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new profile(signup)
profiles.post("/", async (req, res) => {
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
profiles.post("/login", async (req, res) => {
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
        id: profileLogin.userprofile_id,
        username: profileLogin.username,
        email: profileLogin.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = profiles;
