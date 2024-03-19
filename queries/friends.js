const db = require("../db/dbConfig");

// Retrieve all friend requests from the connection_requests table
const getFriendRequests = async () => {
  try {
    const showAllFriendConnection = await db.any(
      "SELECT * FROM connection_requests"
    );
    return showAllFriendConnection;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get a single friend request
const getSingleFriend = async (
  connectionrequests_id,
  receiver_user_profile_id
) => {
  try {
    const singleFriendRequest = await db.oneOrNone(
      "SELECT * FROM connection_requests WHERE connectionrequests_id = $1 AND receiver_user_profile_id = $2",
      [connectionrequests_id, receiver_user_profile_id]
    );
    return singleFriendRequest;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving friend request.");
  }
};
// create a friend list
const createFriends = async (request) => {
  try {
    const { sender_user_profile_id, receiver_user_profile_id, status } =
      request;

    // Insert the friend request into the connection_requests table and return the result
    const newFriendRequests = await db.one(
      "INSERT INTO connection_requests (sender_user_profile_id, receiver_user_profile_id, status) VALUES ($1, $2, $3) RETURNING *",
      [sender_user_profile_id, receiver_user_profile_id, status]
    );

    return newFriendRequests;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// update a friend request
const updateFriend = async (connectionrequests_id, sender_user_profile_id, receiver_user_profile_id, status, timestamp) => {
    try {
      const updatedFriend = await db.one(
        "UPDATE connection_requests SET sender_user_profile_id=$1, receiver_user_profile_id=$2, status=$3, timestamp=$4 WHERE connectionrequests_id=$5 RETURNING *",
        [sender_user_profile_id, receiver_user_profile_id, status, timestamp, connectionrequests_id]
      );
      return updatedFriend;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
//delete a friend request
const deleteFriendRequest = async (
  connectionrequests_id,
  sender_user_profile_id,
  receiver_user_profile_id,
  status,
  timestamp
) => {
  try {
    const deletedFriend = await db.one(
      "DELETE FROM connection_requests WHERE connectionrequests_id = $1 AND sender_user_profile_id = $2 AND receiver_user_profile_id = $3 AND status = $4 AND timestamp = $5 RETURNING *",
      [
        connectionrequests_id,
        sender_user_profile_id,
        receiver_user_profile_id,
        status,
        timestamp,
      ]
    );
    return deletedFriend;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createFriends,
  getFriendRequests,
  deleteFriendRequest,
  getSingleFriend,
  updateFriend,
};
