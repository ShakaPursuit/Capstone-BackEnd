const db = require("../db/dbConfig");

// get all goals
const getGoals = async (userprofile_id) => {
  try {
    const goals = await db.any(
      "SELECT * FROM goals WHERE userprofile_id=$1",
      userprofile_id
    );
    console.log("queries for all the goals: ",goals);
    return goals;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getGoal = async (id, userprofile_id) => {
  try {
    const goal = await db.one(
      "SELECT * FROM goals WHERE goal_id=$1 AND userprofile_id=$2",
      [id, userprofile_id]
    );
    return goal;
  } catch (error) {
    return error;
  }
};

const createGoal = async (goal) => {
  try {
    const { name, description, target_date, userprofile_id, interest_id } =
      goal;
    const newGoal = await db.one(
      "INSERT INTO goals (name, description, target_date, created_at, userprofile_id, interest_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, target_date, new Date(), userprofile_id, interest_id]
    );
    return newGoal;
  } catch (error) {
    return error;
  }
};

const updateGoal = async (id, goal) => {
  try {
    const { name, description, target_date, userprofile_id } = goal;
    const updatedGoal = await db.one(
      "UPDATE goals SET name=$1, description=$2, target_date=$3, created_at=$4, userprofile_id=$5 WHERE goal_id=$6 RETURNING *",
      [name, description, target_date, new Date(), userprofile_id, id]
    );
    return updatedGoal;
  } catch (error) {
    console.log(error)
    return error;
  }
};

const deleteGoal = async (id) => {
  try {
    const deletedGoal = await db.one(
      "DELETE FROM goals WHERE goal_id=$1 RETURNING *",
      id
    );
    return deletedGoal;
  } catch (error) {
    return error;
  }
};

module.exports = { getGoals, getGoal, createGoal, updateGoal, deleteGoal };
