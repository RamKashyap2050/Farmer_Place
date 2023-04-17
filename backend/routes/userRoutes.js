const express = require("express")
const router = express.Router()
const {registerUser, loginUser, deleteUser, StoreFeedback, ReportedPost, StoreComment, getComments, makeLikes, updateUserProfile} = require("../controllers/UserController")
const { changepassword, forgotpassword, sendpasswordlink } = require("../controllers/forgotpassword")
const protect = require('../middlewares/protect')

router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/sendpasswordlink/').post(sendpasswordlink)
router.route('/forgotpassword/:id/:token').get(forgotpassword)
router.route('/:id/:token').post(changepassword)
router.route('/delete/:id').delete(protect,deleteUser)
router.route('/dodo').post(protect,StoreFeedback)
router.route('/report').post(ReportedPost)
router.route('/makeacomment').post(StoreComment)
router.route('/fetchcomment').get(getComments)
router.route('/updateuser').put(updateUserProfile)
module.exports = router