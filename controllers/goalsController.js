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
  markGoalAsCompleted
} = require("../queries/goals");

const { checkGoals, checkTargets } = require("../validations/checkGoals");

const { authenticateToken } = require("../auth/auth");

// Get all goals
goals.get("/", authenticateToken, async (req, res) => {
  try {
    const { userprofile_id } = req.params;
    
    // console.log(req.params)
    // console.log("user profile id",userprofile_id);
    // console.log(req.user);
  
    const goals = await getGoals(userprofile_id);
    console.log(goals);
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
    if (userprofile_id !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Forbidden - You can only acess your own goal" });
    }
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
      console.log(req.body)
      res.status(200).json(createdGoal);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

goals.put(
  "/:id",

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
goals.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateResult = await markGoalAsCompleted(id, req.body);
    res.json({ updateResult,message: "Goal status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update goal status" });
  }
});


module.exports = goals;
