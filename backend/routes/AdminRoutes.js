const express = require("express")
const router = express.Router()
const {loginAdmin, deleteUserbyAdmin} = require('../controllers/AdminController')
const protect = require('../middlewares/protect')


router.route('/login/').post(loginAdmin)
router.route('/delete/:id').delete(deleteUserbyAdmin)


module.exports = router