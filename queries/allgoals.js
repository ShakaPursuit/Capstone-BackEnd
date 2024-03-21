const db = require("../db/dbConfig");

const getGoals = async () => {
  try {
    const goals = await db.any("SELECT * FROM goals");
    return goals;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { getGoals };