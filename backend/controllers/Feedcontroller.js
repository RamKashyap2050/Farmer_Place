const asyncHandler = require('express-async-handler')
const Feed = require('../models/FeedModel')
const User = require('../models/userModel')
const getallposts = asyncHandler(async (req, res) => {
  const getallposts = await Feed.find()
    .populate("user", "user_name image AccountStatus")
    .populate("liked_by", "user_name image") 
    .populate("disliked_by", "user_name image") 
    .select("title content user post_image FeedStatus liked_by disliked_by");

  res.status(200).json(getallposts);
});
//To get posts of one user
const getFeed = asyncHandler(async (req, res) => {
  const feed = await Feed.find({ user: req.user.id })
  .populate("user", "user_name image AccountStatus")
  .select("title content user post_image");

  res.status(200).json(feed)
})

const setFeedPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const post_image = req.files.post_image;

  const feed = await Feed.create({
    title,
    content,
    post_image,
    user: req.user.id, // Set the "user" field to the authenticated user's ID
  });

  res.status(200).json(feed);
});



const deleteFeed = asyncHandler(async (req, res) => {
  const feed = await Feed.findById(req.params.id)

  if (!feed) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (feed.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const feedeleted = await Feed.deleteOne(feed)
  res.status(200).json({ id: req.params.id })
})


const makeLikes = asyncHandler(async(req, res) => {
  const {postId} = req.params;
  const {liked_by_id} = req.body;

  const post = await Feed.findById(postId);

  if (post.liked_by.includes(liked_by_id)) {
    return res.status(400).json({ message: 'You have already liked this post' });
  }

  if (post.disliked_by.includes(liked_by_id)) {
    await Feed.updateOne(
      { _id: postId },
      { $pull: { disliked_by: liked_by_id } }
    );
  }

  const updateLikes = await Feed.updateOne(
    { _id: postId },
    { $push: { liked_by: liked_by_id } }
  );
  
  res.status(200).json(updateLikes);
});

const makedisLikes = asyncHandler(async(req, res) => {
  const {postId} = req.params;
  const {liked_by_id} = req.body;

  const post = await Feed.findById(postId);

  if (post.disliked_by.includes(liked_by_id)) {
    return res.status(400).json({ message: 'You have already disliked this post' });
  }

  if (post.liked_by.includes(liked_by_id)) {
    await Feed.updateOne(
      { _id: postId },
      { $pull: { liked_by: liked_by_id } }
    );
  }

  const updateLikes = await Feed.updateOne(
    { _id: postId },
    { $push: { disliked_by: liked_by_id } }
  );
  
  res.status(200).json(updateLikes);
});


const getUserNames = asyncHandler(async (req, res) => {
  const { userIds } = req.body;
  const users = await User.find({ _id: { $in: userIds } }).select('user_name');

  const userNames = users.map(user => user.user_name);

  res.json(userNames);
});



module.exports = {
  getFeed,
  setFeedPost,
  deleteFeed,
  getallposts,
  makeLikes,
  makedisLikes,
  getUserNames
}