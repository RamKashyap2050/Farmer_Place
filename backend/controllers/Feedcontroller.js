const asyncHandler = require("express-async-handler");
const Feed = require("../models/FeedModel");
const User = require("../models/userModel");
const FollowersModel = require("../models/FollowersModel");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const SaveModel = require("../models/SaveModel");
const getallposts = asyncHandler(async (req, res) => {
  const posts = await Feed.find()
    .populate(
      "user",
      "user_name image AccountStatus PrivateAccount OnlyFollowers IsSubscriber"
    )
    .populate("liked_by", "user_name image")
    .populate("disliked_by", "user_name image")
    .populate({
      path: "comments",
      select: "comment user_id",
      populate: {
        path: "user_id",
        select: "user_name image AccountStatus",
      },
    })
    .select(
      "title content user post_image VideoUrl FeedStatus liked_by disliked_by comments archieved"
    );

  // Define a function to get user followers
  const getUserFollowers = async (userId) => {
    const followers = await FollowersModel.find({
      following_to_ID: userId,
    }).select("followed_by_ID");

    return followers.map((follower) => follower.followed_by_ID);
  };

  // Loop through posts and add User_Followers array
  const postsWithFollowers = await Promise.all(
    posts.map(async (post) => {
      const followers = await getUserFollowers(post.user._id);
      return {
        ...post._doc,
        User_Followers: followers,
      };
    })
  );

  const responseSize = JSON.stringify(postsWithFollowers).length;

  console.log(`Data size of the response: ${responseSize} bytes`);
  console.log(postsWithFollowers);

  res.status(200).json(postsWithFollowers);
});

//To get posts of one user
const getFeed = asyncHandler(async (req, res) => {
  const feed = await Feed.find({ user: req.user.id })
    .populate("user", "user_name image AccountStatus archieved")
    .select("title content user post_image");

  res.status(200).json(feed);
});

const setFeedPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const file = req.files.post_image || req.files.video;

  if (!title || !content || !file) {
    return res.status(403).send({ message: "Please enter all fields" });
  }

  let fileUrl = "";
  let isImage = false;
  let isVideo = false;

  if (file.mimetype.startsWith("image/")) {
    fileUrl = await uploadImageToS3(file);
    isImage = true;
  } else if (file.mimetype.startsWith("video/")) {
    fileUrl = await uploadImageToS3(file);
    isVideo = true;
  } else {
    return res.status(400).send({ message: "Unsupported file type" });
  }

  const feed = await Feed.create({
    title,
    content,
    post_image: isImage ? fileUrl : "",
    VideoUrl: isVideo ? fileUrl : "",
    user: req.user.id, // Set the "user" field to the authenticated user's ID
  });

  res.status(200).json(feed);
});


//Get the One Post of One User in their Profile Page Display
const getonepostofoneuser = asyncHandler(async (req, res) => {
  console.log("I am Here");
  const feed = await Feed.findById(req.params.id);
  console.log(feed);
  if (!feed) {
    console.error(error);
  }
  res.json(feed).status(200);
});

//Function that user to delete his posts
const deleteFeed = asyncHandler(async (req, res) => {
  const feed = await Feed.findById(req.params.id);

  if (!feed) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (feed.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const feedeleted = await Feed.deleteOne(feed);
  res.status(200).json({ id: req.params.id });
});

//Function that makes user ability to like the post
const makeLikes = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { liked_by_id } = req.body;

  const post = await Feed.findById(postId);

  if (post.liked_by.includes(liked_by_id)) {
    await Feed.updateOne({ _id: postId }, { $pull: { liked_by: liked_by_id } });
    return res.status(400).json({ message: "Liked Removed" });
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

//Function for Dislikes
const makedisLikes = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { liked_by_id } = req.body;

  const post = await Feed.findById(postId);

  if (post.disliked_by.includes(liked_by_id)) {
    await Feed.updateOne(
      { _id: postId },
      { $pull: { disliked_by: liked_by_id } }
    );
    return res.status(400).json({ message: "Dislike Removed" });
  }

  if (post.liked_by.includes(liked_by_id)) {
    await Feed.updateOne({ _id: postId }, { $pull: { liked_by: liked_by_id } });
  }

  const updateLikes = await Feed.updateOne(
    { _id: postId },
    { $push: { disliked_by: liked_by_id } }
  );

  res.status(200).json(updateLikes);
});

//Function for making comment
const makeComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { user_id, comment } = req.body;
  const newComment = { user_id, comment };

  const updateComments = await Feed.updateOne(
    { _id: postId },
    { $push: { comments: newComment } }
  );

  res.status(200).json(newComment);
});

const getUserNames = asyncHandler(async (req, res) => {
  const { userIds } = req.body;
  const users = await User.find({ _id: { $in: userIds } }).select("user_name");

  const userNames = users.map((user) => user.user_name);

  res.json(userNames);
});

const SavePost = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);

  const SavePosts = await SaveModel.create({
    saving_user_id: data.user_id,
    post_id: data.post,
  });
  res.status(201).json(SavePosts);
});

const getSavedPosts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const savedPosts = await SaveModel.find({ saving_user_id: id })
      .populate({
        path: "saving_user_id",
        select: "user_name email image", // Select the fields you want from the User model
      })
      .populate({
        path: "post_id",
        populate: {
          path: "user", // Populate the "user" field within the "post_id" object
          select: "user_name email image", // Select the fields you want from the User model
        },
      });

    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const archivepost = asyncHandler(async (req, res) => {
  const post = req.params.post;
  console.log(post);
  const feed = await Feed.findByIdAndUpdate(
    post,
    { archieved: true },
    { new: true }
  );
});

module.exports = {
  getFeed,
  setFeedPost,
  deleteFeed,
  getallposts,
  makeLikes,
  makedisLikes,
  getUserNames,
  makeComment,
  archivepost,
  SavePost,
  getSavedPosts,
  getonepostofoneuser,
};
