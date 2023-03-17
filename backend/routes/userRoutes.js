const express = require("express")
const router = express.Router()
const {registerUser, loginUser, deleteUser} = require("../controllers/UserController")
const protect = require('../middlewares/protect')


router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/delete/:id').delete(deleteUser)


module.exports = router