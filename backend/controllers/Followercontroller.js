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

const getUserFollowersUsingUserID = asyncHandler(async (req, res) => {
    const { userid } = req.body;
    console.log(userid)
    try {
        const followers = await FollowersModel.find({ following_to_ID: userid });
        console.log(followers)
        if (!followers || followers.length === 0) {
            return res.status(404).json({ message: 'No followers found for the given userId.' });
        }

        res.status(200).json({ followers });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = { addfollowers,getUserFollowersUsingUserID };
