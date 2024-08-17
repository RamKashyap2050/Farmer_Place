const express = require("express")
const { setStory } = require("../controllers/StoryController")
const router = express.Router()

router.route("/addstory").post(setStory)

module.exports = router