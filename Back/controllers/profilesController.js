// Importing Express
const express = require("express");

// Creating an instance of a Router
const profiles = express.Router();

// Importing db query functions
const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../queries/profiles");
const { authenticateToken } = require("../auth/auth");

// Get ALL profiles request
profiles.get("/", authenticateToken, async (req, res) => {
  try {
    const profiles = await getProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(404).json({ error });
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

// Create NEW profile
profiles.post("/", authenticateToken, async (req, res) => {
  try {
    const createdProfile = await createProfile(req.body);
    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Update profile
profiles.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfile = await updateProfile(id, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Delete Profile
profiles.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = await deleteProfile(id);
    res.status(200).json({ success: "Successfully deleted profile" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

profiles.get("/", authenticateToken, async (req, res) => {
  try {
    const { user_profile_id } = req.params;
    const profiles = await getProfiles(user_profile_id);
    res.status(200).json(profiles);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

module.exports = profiles;
