const asyncHandler = require("express-async-handler");
const FollowersModel = require("../models/FollowersModel");

const addfollowers = asyncHandler(async (req, res) => {
  const { userId, loggedInUserId } = req.body;

  // Check if a similar entry already exists
  const existingFollower = await FollowersModel.findOne({
    following_to_ID: userId,
    followed_by_ID: loggedInUserId,
  });

  if (existingFollower) {
    res.status(409).json({ message: "User is already following." });
  } else {
    const newFollower = await FollowersModel.create({
      following_to_ID: userId,
      followed_by_ID: loggedInUserId,
    });

    res.status(201).json(newFollower);
  }
});

const deleteFollower = asyncHandler(async (req, res) => {
  const { userId, loggedInUserId} = req.body;
  console.log("Recieved")
  console.log(userId, loggedInUserId)
  const result = await FollowersModel.deleteOne({
    following_to_ID: userId,
    followed_by_ID: loggedInUserId,
  });

  if (result.deletedCount === 0) {
    res.status(404).json({ message: "Entry not found." });
  } else {
    res.status(200).json({ message: "Entry deleted successfully." });
  }
});


const getUserFollowingUsingUserID = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  console.log(userid);
  try {
    const followers = await FollowersModel.find({ followed_by_ID: userid })
      .populate(
        "following_to_ID",
        "user_name image AccountStatus PrivateAccount OnlyFollowers"
      )
      .populate(
        "followed_by_ID",
        "user_name image AccountStatus PrivateAccount OnlyFollowers"
      )
      .select("following_to_id followed_by_id");
    console.log("Follower of User", followers);

    if (!followers || followers.length === 0) {
      return res
        .status(404)
        .json({ message: "No followers found for the given userId." });
    }

    res.status(200).json({ followers });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
});

const getUserFollowersUsingUserID = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  console.log(userid);
  try {
    const followers = await FollowersModel.find({ following_to_ID: userid })
      .populate(
        "following_to_ID",
        "user_name image AccountStatus PrivateAccount OnlyFollowers"
      )
      .populate(
        "followed_by_ID",
        "user_name image AccountStatus PrivateAccount OnlyFollowers"
      )
      .select("followed_by_ID");
    console.log(followers);

    if (!followers || followers.length === 0) {
      return res
        .status(404)
        .json({ message: "No followers found for the given userId." });
    }

    res.status(200).json({ followers });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  addfollowers,
  getUserFollowingUsingUserID,
  getUserFollowersUsingUserID,
  deleteFollower
};
