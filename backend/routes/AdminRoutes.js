const express = require("express")
const router = express.Router()
const {loginAdmin, 
    unblockbyadmin,
    blockbyadmin, 
    getallUsers, 
    sendpasswordlinkforAdmin, 
    changepasswordAdmin, 
    forgotpasswordAdmin, 
    getallProducts, 
    getallPosts,
    deleteListings,
    deleteFeed} = require('../controllers/AdminController')



router.route('/login/').post(loginAdmin)
router.route('/updatetotrue/:id').put(unblockbyadmin)
router.route('/updatetofalse/:id').put(blockbyadmin)
router.route('/getallPosts').get(getallPosts)
router.route('/getallProducts').get(getallProducts)
router.route('/deletelisting/:id').delete(deleteListings)
router.route('/deletefeed/:id').delete(deleteFeed)
router.route('/getallUsers').get(getallUsers)
router.route('/sendpasswordlinkforAdmin/').post(sendpasswordlinkforAdmin)
router.route('/forgotpasswordAdmin/:id/:token').get(forgotpasswordAdmin)
router.route('/:id/:token').post(changepasswordAdmin)


module.exports = router