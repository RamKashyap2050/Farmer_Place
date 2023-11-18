const asyncHandler = require("express-async-handler");
const CloseFriends = require("../models/CloseFriendsModel");
const Users = require("../models/userModel");

const addCloseFriend = asyncHandler(async (req, res) => {
  try {
    const { userId, loggedInUserId } = req.body;
    console.log(userId, loggedInUserId);

    // Create a close friend record
    const closefriend = await CloseFriends.create({
      user_ID: loggedInUserId,
      Close_Friend_ID: userId,
    });

    if (!closefriend) {
      console.log("Close friend not created");
      return res
        .status(500)
        .json({ error: "Failed to create close friend record" });
    }

    res.status(201).json({ closefriend });
  } catch (error) {
    console.error("Error creating close friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  addCloseFriend,
};
