const asyncHandler = require("express-async-handler");
const FollowersModel = require("../models/FollowersModel");
const Users = require("../models/userModel")
const addfollowers = asyncHandler(async (req, res) => {
  const { userId, loggedInUserId } = req.body;

  const targetUser = await Users.findById(userId);

  if (!targetUser) {
    return res.status(404).json({ message: "Target user not found." });
  }

  if (targetUser.PrivateAccount || targetUser.OnlyFollowers) {
    const existingRequest = await FollowersModel.findOne({
      following_to_ID: userId,
      followed_by_ID: loggedInUserId,
      requestStatus: "pending", 
    });

    if (existingRequest) {
      return res.status(409).json({ message: "Follow request already sent." });
    }

    const newRequest = await FollowersModel.create({
      following_to_ID: userId,
      followed_by_ID: loggedInUserId,
      requestStatus: "pending",
    });

    return res.status(201).json(newRequest);
  } else {
    const existingFollower = await FollowersModel.findOne({
      following_to_ID: userId,
      followed_by_ID: loggedInUserId,
      requestStatus: "accepted", 
    });

    if (existingFollower) {
      return res.status(409).json({ message: "User is already following." });
    }

    const newFollower = await FollowersModel.create({
      following_to_ID: userId,
      followed_by_ID: loggedInUserId,
      requestStatus: "accepted",
    });

    return res.status(201).json(newFollower);
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
      .select("following_to_id followed_by_id requestStatus");

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
      .select("followed_by_ID requestStatus");

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


const UpdateFollowerStatus = async (req, res) => {
  try {
    const { userId, loggedInUserId } = req.body;
    console.log(userId,loggedInUserId)
    const followerRecord = await FollowersModel.findOne({
      followed_by_ID: userId,
      following_to_ID: loggedInUserId
    });
    
    if (!followerRecord) {
      return res.status(404).json({ message: 'Follower record not found.' });
    }

    followerRecord.requestStatus = 'accepted'; 

    await followerRecord.save();

    res.status(200).json({ message: 'Follower record updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  addfollowers,
  getUserFollowingUsingUserID,
  getUserFollowersUsingUserID,
  deleteFollower,
  UpdateFollowerStatus
};
