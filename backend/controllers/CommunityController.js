const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const Community = require("../models/CommunityModel");
const Community_Content = require("../models/CommunityContentModel");
const { uploadImageToS3 } = require("../AWS_S3/s3");

const createcommunity = asyncHandler(async (req, res) => {
  const { Admin_ID, Community_Name, Community_Description } = req.body;
  const { Community_Image, Community_Cover_Image } = req.files;
  const imageUrl = await uploadImageToS3(Community_Image);
  const coverimageURL = await uploadImageToS3(Community_Cover_Image);
  const createcommunity = await Community.create({
    Admin_ID: Admin_ID,
    Community_Name: Community_Name,
    Community_Image: imageUrl,
    Community_Description: Community_Description,
    Community_Cover_Image: coverimageURL,
  });

  res.status(201).json(createcommunity);
});
const getcommunity = asyncHandler(async (req, res) => {
  try {
    const adminId = req.params.id; // Use camelCase for variable names
    const communities = await Community.find({ Admin_ID: adminId });

    res.status(200).json(communities);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const showresultsforonecommunity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const showresultsforoneuser = await Community.find({ _id: id });
  res.status(200).json(showresultsforoneuser);
});

module.exports = { createcommunity, getcommunity, showresultsforonecommunity };
