const express = require('express');
const { getGoals } = require('../queries/allgoals');
const allgoals = express.Router({ mergeParams: true });

// get all goals
allgoals.get("/", async (req, res) => {
  try {
    const goals = await getGoals();
    res.status(200).json(goals);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Goals Not Found" });
  }
});

module.exports = allgoals;