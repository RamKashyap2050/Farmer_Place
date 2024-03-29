const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  StoreFeedback,
  ReportedPost,
  updateUserProfile,
  showresultsforoneuser,
  getuserinsearch,
  contentrestriction,
  BecomeVerifiedUser
} = require("../controllers/UserController");
const {
  changepassword,
  forgotpassword,
  sendpasswordlink,
} = require("../controllers/forgotpassword");
const protect = require("../middlewares/protect");

router.route("/register/").post(registerUser);
router.route("/login/").post(loginUser);
router.route("/sendpasswordlink/").post(sendpasswordlink);
router.route("/forgotpassword/:id/:token").get(forgotpassword);
router.route("/:id/:token").post(changepassword);
router.route("/delete/:id").delete(protect, deleteUser);
router.route("/feedback").post(protect, StoreFeedback);
router.route("/report").post(ReportedPost);
router.route("/updateuser/:userID").put(updateUserProfile);
router.route("/getOneUserforSearch/:id").get(showresultsforoneuser)
router.route("/getuser/:id/:loggedinuserid").get(getuserinsearch)
router.route("/contentrestriction/:id").put(contentrestriction)
router.route("/becomeverifieduser/:id").put(BecomeVerifiedUser)
module.exports = router;
