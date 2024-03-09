const db = require("../db/dbConfig");


const getInterests = async () => {
  try {
    const interests = await db.any("SELECT * FROM interests");
    return interests;
  } catch (error) {
    return error;
  }
};


const getInterest = async (id) => {
  try {
    const interest = await db.one("SELECT * FROM interests WHERE id = $1", id);
    return interest;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getInterests,
  getInterest,
};