const asyncHandler = require("express-async-handler");
const FollowersModel = require("../models/FollowersModel");

const addfollowers = asyncHandler(async (req, res) => {
  const {userId, loggedInUserId }= req.body;
  console.log(userId, loggedInUserId);
  const addfollowers = await FollowersModel.create({
    following_to_ID: userId,
    followed_by_ID: loggedInUserId,
  });

  res.status(201).json(addfollowers);
});

const getUserFollowingUsingUserID = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  console.log(userid)
  try {
    const followers = await FollowersModel.find({ followed_by_ID: userid })
        .populate("following_to_ID", "user_name image AccountStatus")
        .populate("followed_by_ID", "user_name image AccountStatus")
        .select("following_to_id followed_by_id");
    console.log(followers);

    if (!followers || followers.length === 0) {
        return res.status(404).json({ message: 'No followers found for the given userId.' });
    }

    res.status(200).json({ followers });
} catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
}

});

const getUserFollowersUsingUserID = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  console.log(userid)
  try {
    const followers = await FollowersModel.find({ following_to_ID: userid })
        .populate("following_to_ID", "user_name image AccountStatus")
        .populate("followed_by_ID", "user_name image AccountStatus")
        .select("followed_by_ID");
    console.log(followers);

    if (!followers || followers.length === 0) {
        return res.status(404).json({ message: 'No followers found for the given userId.' });
    }

    res.status(200).json({ followers });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = { addfollowers,getUserFollowingUsingUserID, getUserFollowersUsingUserID };
