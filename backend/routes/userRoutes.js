const express = require("express")
const router = express.Router()
const {registerUser, loginUser} = require("../controllers/UserController")
const { forgotpassword, resetpassword, resetpassword1 } = require("../controllers/forgotpassword")
const protect = require('../middlewares/protect')

router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/forgotpassword/').post(forgotpassword)
router.route('/reset-password/:id&:token').get(resetpassword)
router.route('/reset-password/:id&:token').post(resetpassword1)
module.exports = router