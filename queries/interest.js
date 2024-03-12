const db = require("../db/dbConfig");

const getInterests = async () => {
  try {
    const interests = await db.any("SELECT * FROM interests");
    return interests;
  } catch (error) {
    return error;
  }
};

const getInterest = async (userprofile_id) => {
  try {
    const interest = await db.any(
      "SELECT * FROM interests WHERE userprofile_id=$1 ",
      [userprofile_id]
    );
    return interest;
  } catch (error) {
    return error;
  }
};

// const getUserProfilesByInterest = async (interest_id) => {
//   try {
//     const userProfiles = await db.any(
//       `
//       SELECT up.*
//       FROM user_profiles up
//       INNER JOIN interest_connections ic ON up.userprofile_id = ic.userprofile_id
//       WHERE ic.interest_id = $1
//       `,
//       interest_id
//     );
//     return userProfiles;
//   } catch (error) {
//     throw error;
//   }
// };

const getUserProfilesByInterest = async (interest_id) => {
  try {
    const interests = await db.any(
      "SELECT * FROM interest_connections JOIN user_profiles ON interest_connections.userprofile_id = user_profiles.userprofile_id WHERE interest_id=$1",
      [interest_id]
    );
    console.log(interests);
    return interests;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getInterests,
  getInterest,
  getUserProfilesByInterest,
};
