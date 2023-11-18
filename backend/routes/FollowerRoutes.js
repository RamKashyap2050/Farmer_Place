const express = require("express")
const { addfollowers, getUserFollowingUsingUserID, getUserFollowersUsingUserID, deleteFollower, UpdateFollowerStatus} = require("../controllers/Followercontroller")
const router = express.Router()

router.route('/addfollowers').post(addfollowers)
router.route('/getfollowingforuser/:userid').get(getUserFollowingUsingUserID)
router.route('/getfollowersforuser/:userid').get(getUserFollowersUsingUserID)
router.route('/unfollow').delete(deleteFollower)
router.route('/updatefollowersstatus').put(UpdateFollowerStatus)
module.exports = router