const express = require("express")
const router = express.Router()
const {loginAdmin, deleteUserbyAdmin, getallUsers} = require('../controllers/AdminController')
const protect = require('../middlewares/protect')


router.route('/login/').post(loginAdmin)
router.route('/delete/:id').delete(deleteUserbyAdmin)
router.route('/getallUsers').get(getallUsers)



module.exports = router