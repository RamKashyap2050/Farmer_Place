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
const getclosefriends = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const closeFriends = await CloseFriends.find({ user_ID: id }).select(
      "Close_Friend_ID"
    );

    const closeFriendIds = closeFriends.map((friend) => friend.Close_Friend_ID);

    const populatedCloseFriends = await Users.find({
      _id: { $in: closeFriendIds },
    }).select("user_name image"); // Add other fields you want to retrieve
    console.log(populatedCloseFriends)
    return res.json(populatedCloseFriends );
  } catch (error) {
    console.error("Error Getting Close friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  addCloseFriend,
  getclosefriends,
};
