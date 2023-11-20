const express = require("express")
const { addCloseFriend, getclosefriends } = require("../controllers/CloseFriendController")
const router = express.Router()
router.route('/addclosefriends').post(addCloseFriend)
router.route('/getclosefriends/:id').get(getclosefriends)

module.exports = router