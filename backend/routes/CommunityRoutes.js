const express = require("express");
const router = express.Router();

const { createcommunity, getcommunity, showresultsforonecommunity, sendrequestforinvites } = require("../controllers/CommunityController");

router.route("/createcommunity").post(createcommunity); 
router.route("/getcommunity/:id").get(getcommunity);
router.route("/getOneCommunityforSearch/:id").get(showresultsforonecommunity)
router.route("/sendinvite").put(sendrequestforinvites)


module.exports = router;
