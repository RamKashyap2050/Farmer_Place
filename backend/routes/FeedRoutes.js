const express = require('express');
const protect = require('../middlewares/protect')
const { getFeed,setFeedPost, deleteFeed, getallposts,makeLikes, getUserNames,makedisLikes } = require('../controllers/Feedcontroller');
const router = express.Router()




router.route('/').get(protect, getFeed).post(protect, setFeedPost)
router.route('/:id').delete(protect, deleteFeed)
router.route('/getallposts').get(getallposts)
router.route('/:postId/likes').post(makeLikes)
router.route('/:postId/dislikes').post(makedisLikes)
router.route('/userNames').get(getUserNames)

module.exports = router