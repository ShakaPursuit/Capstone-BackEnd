const express = require('express');
const {createFriends, getFriendRequests, deleteFriendRequest, getSingleFriend} = require('../queries/friends');
const friendRequest = express.Router()

// get all friends requests
friendRequest.get("/", async (req, res) => {
    try {
      const friends = await getFriendRequests();
      res.status(200).json(friends);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
// get a single friend request
friendRequest.get("/:receiver_user_profile_id/:connectionrequests_id", async (req, res) => {
    try {
      const { receiver_user_profile_id, connectionrequests_id } = req.params;
      const singleFriendRequest = await getSingleFriend(receiver_user_profile_id, connectionrequests_id);
      res.status(200).json(singleFriendRequest);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Friend Request Not Found" });
    }
  });

// a single post from a friend request
friendRequest.post("/", async (req, res) => {
    try {
        const friendRequest =  await createFriends(req.body)
        res.status(200).json(friendRequest);
    } catch (error) {
        return error;
    }
})
// delete friend request
friendRequest.delete("/:sender_user_profile_id/:receiver_user_profile_id", async (req, res) => {
    try {
      const { sender_user_profile_id, receiver_user_profile_id, status, timestamp } = req.params;
      const deleteRequest = await deleteFriendRequest(sender_user_profile_id, receiver_user_profile_id, status,timestamp);
      res.status(200).json({ success: "Successfully deleted friend request" });
      return deleteRequest
    } catch (error) {
      res.status(404).json({ error: "Error deleting friend request" });
    }
  });
module.exports = friendRequest;