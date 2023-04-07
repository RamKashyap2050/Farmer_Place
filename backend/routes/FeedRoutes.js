const express = require('express');
const protect = require('../middlewares/protect')
const { getFeed,setFeedPost, deleteFeed } = require('../controllers/Feedcontroller');
const router = express.Router()




router.route('/').get(protect, getFeed).post(protect, setFeedPost)

module.exports = router