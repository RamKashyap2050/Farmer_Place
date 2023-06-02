const asyncHandler = require('express-async-handler')
const MarketPlace = require('../models/MarketPlaceModel')
const User = require('../models/userModel')


const getallproducts = asyncHandler(async (req, res) => {
  const getallproducts = await MarketPlace.find()
    .populate("user", "user_name image email AccountStatus")
    .select("product_name product_price product_description user product_image");

  res.status(200).json(getallproducts);
});
//To get posts of one user
const getproducts = asyncHandler(async (req, res) => {
  const marketplace = await MarketPlace.find({ user: req.user.id })
  .populate("user", "user_name email image AccountStatus")
  .select("product_name product_price product_description user product_image")

  res.status(200).json(marketplace)
})

const setMarketPlaceProduct = asyncHandler(async (req, res) => {
  const { product_name, product_description, product_price } = req.body;
  const product_image = req.files.product_image;

  const marketplace = await MarketPlace.create({
    product_name,
    product_price,
    product_description,
    product_image,
    user: req.user.id, 
  });

  res.status(200).json(marketplace);
});



const deleteMarketPlaceProduct = asyncHandler(async (req, res) => {
  const marketplace = await MarketPlace.findById(req.params.id)

  if (!marketplace) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (marketplace.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await feed.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getallproducts,
  setMarketPlaceProduct,
  deleteMarketPlaceProduct,
  getproducts
}