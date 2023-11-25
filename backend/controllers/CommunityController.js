const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const Community = require("../models/CommunityModel")
const Community_Content = require("../models/CommunityContentModel")
const { uploadImageToS3 } = require("../AWS_S3/s3");


const createcommunity = asyncHandler(async(req,res) => {
const {Admin_id, Community_Name, Community_Description} = req.body;
const {Community_Image} = req.files;
const imageUrl = await uploadImageToS3(Community_Image);

const createcommunity = await Community.create({
    Admin_ID: Admin_id,
    Community_Name: Community_Name,
    Community_Image: imageUrl,
    Community_Description: Community_Description
})

res.status(201).json(createcommunity)

})

module.exports = {createcommunity}