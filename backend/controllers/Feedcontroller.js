const asyncHandler = require('express-async-handler')
const Feed = require('../models/FeedModel')
const User = require('../models/userModel')
const getallposts = asyncHandler(async (req, res) => {
  const getallposts = await Feed.find()
    .populate("user", "user_name image AccountStatus")
    .select("title content user post_image");

  res.status(200).json(getallposts);
});
//To get posts of one user
const getFeed = asyncHandler(async (req, res) => {
  const feed = await Feed.find({ user: req.user.id })

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

  await feed.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getFeed,
  setFeedPost,
  deleteFeed,
  getallposts
}