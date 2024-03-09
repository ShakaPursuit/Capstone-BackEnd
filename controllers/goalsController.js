// Import express
const express = require("express");
// Create an instance of a Router
const goals = express.Router({ mergeParams: true });
// Import db query functions
const {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../queries/goals");

const { checkGoals, checkTargets } = require("../validations/checkGoals");

const { authenticateToken } = require("../auth/auth");

// Get all goals
goals.get("/", authenticateToken, async (req, res) => {
  try {
    const { userprofile_id } = req.params;
    const goals = await getGoals(userprofile_id);
    res.status(200).json(goals);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Goals Not Found" });
  }
});

// Get one goal
goals.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id, userprofile_id } = req.params;
    const goal = await getGoal(id, userprofile_id);
    res.status(200).json(goal);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Goal Not Found" });
  }
});

goals.post(
  "/",
  authenticateToken,
  checkGoals,
  checkTargets,
  async (req, res) => {
    try {
      const createdGoal = await createGoal(req.body);
      res.status(200).json(createdGoal);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

goals.put(
  "/:id",
  authenticateToken,
  checkGoals,
  checkTargets,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGoal = await updateGoal(id, req.body);
      res.status(200).json(updatedGoal);
    } catch (error) {
      res.status(404).json({ error: "error" });
    }
  }
);

goals.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGoal = await deleteGoal(id);
    res.status(200).json({ success: "Successfully deleted goal" });
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
});

module.exports = goals;
