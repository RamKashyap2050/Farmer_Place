const express = require("express");
const router = express.Router();

const { createcommunity, getcommunity, showresultsforonecommunity } = require("../controllers/CommunityController");

router.route("/createcommunity").post(createcommunity); 
router.route("/getcommunity/:id").get(getcommunity);
router.route("/getOneCommunityforSearch/:id").get(showresultsforonecommunity)



module.exports = router;
