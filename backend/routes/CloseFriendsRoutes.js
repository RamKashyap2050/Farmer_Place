const express = require("express")
const { addCloseFriend } = require("../controllers/CloseFriendController")
const router = express.Router()
router.route('/addclosefriends').post(addCloseFriend)

module.exports = router