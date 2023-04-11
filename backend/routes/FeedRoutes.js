const express = require('express');
const protect = require('../middlewares/protect')
const { getFeed,setFeedPost, deleteFeed, getallposts } = require('../controllers/Feedcontroller');
const router = express.Router()




router.route('/').get(protect, getFeed).post(protect, setFeedPost)
router.route('/:id').delete(protect, deleteFeed)
router.route('/getallposts').get(getallposts)

module.exports = router