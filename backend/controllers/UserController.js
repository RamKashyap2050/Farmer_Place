const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Feedback = require("../models/FeedbackModal");
const Report = require("../models/ReportModel");
const Comment = require("../models/commentModel");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const Feed = require("../models/FeedModel");
const FollowersModel = require("../models/FollowersModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CloseFriends = require("../models/CloseFriendsModel");

//Function that enables us to Signup
const registerUser = asyncHandler(async (req, res) => {
  const { user_name, phone, email, password } = req.body;
  const image = req.files.image;
  if (!user_name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }

  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const imageUrl = await uploadImageToS3(image);

  const user = await Users.create({
    user_name,
    phone,
    email,
    password: hashedPassword,
    image: imageUrl,
  });

  if (!user) {
    res.status(400);
    throw new Error("Account not registered");
  }

  //Welcome Mail in addition
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
  var mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: user.email,
    subject: "Welcome to Farmer Place App",
    html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><h1>Happy to see you ${user.user_name}</h1><br><p style="color: #0000ff;">Thanks for signing up to Farmer Place!</p><br><br><a href="https://localhost:3000/dashboard/">Click Here to get started</a></div></body></html>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(201).json({
    _id: user.id,
    user_name: user.user_name,
    phone: user.phone,
    email: user.email,
    image: user.image,
    IsSubscriber: user.IsSubscriber,
    token: await generateToken(user.id),
    message: "You are registered",
  });
});

//Function which enables User to Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const user = await Users.findOne({ email });

  if (user) {
    if (user.AccountStatus == true) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        res.status(200).json({
          _id: user.id,
          user_name: user.user_name,
          phone: user.phone,
          email: user.email,
          image: user.image,
          IsSubscriber: user.IsSubscriber,
          token: await generateToken(user.id),
        });
      } else {
        res.status(400);
        throw new Error("Incorrect password");
      }
    } else {
      res.status(401);
      throw new Error("User account is blocked");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const updatedUser = await Users.findByIdAndUpdate(
    userID,
    { ...req.body },
    {
      new: true,
    }
  );
  res.status(200).json({
    ...updatedUser._doc,
    token: await generateToken(updatedUser._id),
  });
});

//Function that enables us to Delete our account
const deleteUser = asyncHandler(async (req, res) => {
  const userdelete = await Users.findById(req.params.id);

  if (req.user && req.user._id.toString() !== userdelete.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  } else {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
    var mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: userdelete.email,
      subject: "We are Sorry to see you go!!",
      html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><h1>Please Help us ${userdelete.user_name} to Improve by giving feedback </h1><br><br><br><a href="https://localhost:3000/feedback/">Click Here to give a Feedback</a><br /><br /><a href="https://localhost:3000/signupuser">Click Here if you did it by Mistake</a></div></body></html>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const deletedUser = await Users.deleteOne({ _id: req.params.id });
    res.json({ message: "User deleted successfully", data: deletedUser });
  }
});

const getAllusers = asyncHandler(async (req, res) => {
  const getAllusers = await Users.find();
});
//Reported Posts from User
const ReportedPost = asyncHandler(async (req, res) => {
  const { title, user_name, reported_by } = req.body;
  console.log(title, user_name, reported_by);
  await Report.create({
    title,
    user_name,
    reported_by,
  });
});

//FeedbackForm from Users
const StoreFeedback = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  await Feedback.create({
    subject,
    message,
    user: req.user.id,
  });
  res.status(201).json({
    message: "Succesfully Stored Feedback",
  });
});

const showresultsforoneuser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const showresultsforoneuser = await Feed.find({ user: id })
    .populate("user", "user_name image AccountStatus archieved")
    .select("title content user post_image");
  res.status(200).json(showresultsforoneuser);
});

const getuserinsearch = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const loggedinuserid  = req.params.loggedinuserid;
  let isCloseFriend = false;


  
  console.log(`ID(ID of whose results are being display,  Close_Friend_ID):${id} `)
  console.log(`Who is Primary user(ID of whose are viewing those results are being display, user_ID):${loggedinuserid} `)

  try {
    const getuserinsearch = await Users.findOne({ _id: id });

    if (!getuserinsearch) {
      return res.status(404).json({ message: "User not found" });
    }

    const followers = await FollowersModel.find({ following_to_ID: id });
    const following = await FollowersModel.find({ followed_by_ID: id });
    const close_friends = await CloseFriends.findOne({
      Close_Friend_ID: id,
      user_ID: loggedinuserid,
    });
    console.log("Close Friends", close_friends)

    // Retrieve follower IDs and requestStatus
    const followersInfo = await Promise.all(
      followers.map(async (follower) => {
        const user = await Users.findOne({ _id: follower.followed_by_ID });
        return {
          follower_id: follower.followed_by_ID,
          requestStatus: follower.requestStatus,
        };
      })
    );

    const followingInfo = await Promise.all(
      following.map(async (follower) => {
        const user = await Users.findOne({ _id: follower.following_to_ID });
        return {
          following_id: follower.following_to_ID,
          requestStatus: follower.requestStatus,
        };
      })
    );

    if (close_friends) {
      isCloseFriend = true;
    }
    
    const userWithFollowers = {
      ...getuserinsearch._doc,
      User_Followers: followersInfo,
      User_Following: followingInfo,
      Close_Friends: isCloseFriend,
    };

    console.log("User With Followers for Individual Page", userWithFollowers);
    return res.status(200).json(userWithFollowers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


const BecomeVerifiedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const token = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create({
      amount: 10 * 100,
      customer: customer.id,
      currency: "CAD",
      receipt_email: token.email,
    });

    if (payment) {
      const updatedUser = await Users.updateOne(
        { _id: id }, // Update the user with the specified ID
        { $set: { IsSubscriber: true } } // Update the 'verified' field to True
      );

      if (updatedUser) {
        res
          .status(200)
          .json({ message: "Payment successful and user updated." });
      } else {
        res.status(500).json({ message: "Failed to update user." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed." });
  }
});

const contentrestriction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body.contentRestriction;

  // Fetch the user's current settings
  const user = await Users.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (data === "only-me") {
    await Users.findByIdAndUpdate(id, {
      PrivateAccount: true,
      OnlyFollowers: false,
    });

    return res
      .status(200)
      .json({ message: "Content restriction updated to 'Only Me'" });
  } else if (data === "public") {
    await Users.findByIdAndUpdate(id, {
      PrivateAccount: false,
      OnlyFollowers: false,
    });

    return res
      .status(200)
      .json({ message: "Content restriction updated to 'Public'" });
  } else if (data === "followers") {
    await Users.findByIdAndUpdate(id, {
      PrivateAccount: false,
      OnlyFollowers: true,
    });

    return res
      .status(200)
      .json({ message: "Content restriction updated to 'Only Followers'" });
  }

  return res
    .status(200)
    .json({ message: "Content restriction updated to something else" });
});

//To Generate Tokens
const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUserProfile,
  getAllusers,
  StoreFeedback,
  ReportedPost,
  showresultsforoneuser,
  getuserinsearch,
  contentrestriction,
  BecomeVerifiedUser,
};
