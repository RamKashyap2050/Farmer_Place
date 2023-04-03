const express = require("express")
const router = express.Router()
const {loginAdmin, unblockbyadmin,blockbyadmin, getallUsers, sendpasswordlinkforAdmin, changepasswordAdmin, forgotpasswordAdmin} = require('../controllers/AdminController')
const protect = require('../middlewares/protect')


router.route('/login/').post(loginAdmin)
router.route('/updatetotrue/:id').put(unblockbyadmin)
router.route('/updatetofalse/:id').put(blockbyadmin)

router.route('/getallUsers').get(getallUsers)
router.route('/sendpasswordlinkforAdmin/').post(sendpasswordlinkforAdmin)
router.route('/forgotpasswordAdmin/:id/:token').get(forgotpasswordAdmin)
router.route('/:id/:token').post(changepasswordAdmin)


module.exports = router