const asyncHandler = require("express-async-handler");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const StoryModel = require("../models/StoryModal");

const setStory = asyncHandler(async (req, res) => {
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

  const story = await StoryModel.create({
    post_image: isImage ? fileUrl : "",
    VideoUrl: isVideo ? fileUrl : "",
    stroy_posting_user_id: req.user.id,
  });

  res.status(200).json(story);
});

const getStories = asyncHandler(async(req,res) => {
  const getStories = await StoryModel.find()
})

module.exports = { setStory };
