// Import express
const express = require("express");
// Create an instance of a Router
const interests = express.Router({ mergeParams: true });

const {
  getInterest,
  getInterests,
  getUserProfilesByInterest,
} = require("../queries/interest");

interests.get("/", async (req, res) => {
  try {
    const { interest_id } = req.params;
    const interests = await getInterests(interest_id);
    res.status(200).json(interests);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Interest Not Found" });
  }
});

// interests.get("/profile", async (req, res) => {
//   try {
//     const { interest_id } = req.params;
//     const interests = await getInterests(interest_id);
//     res.status(200).json(interests);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ error: "Interest Not Found" });
//   }
// });

// Get Interest from ONE profile
interests.get("/profile/:userprofile_id", async (req, res) => {
  try {
    const { userprofile_id } = req.params;
    const interest = await getInterest(userprofile_id);
    res.status(200).json(interest);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Interest Not Found" });
  }
});

interests.get("/:interest_id/profiles", async (req, res) => {
  try {
    const { interest_id } = req.params;
    const userProfiles = await getUserProfilesByInterest(interest_id);
    res.status(200).json(userProfiles);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Interest Not Found" });
  }
});

module.exports = interests;
