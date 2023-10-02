const express = require("express")
const { addfollowers, getUserFollowersUsingUserID } = require("../controllers/Followercontroller")
const router = express.Router()

router.route('/addfollowers').post(addfollowers)
router.route('/getfollowersforuser').get(getUserFollowersUsingUserID)

module.exports = router