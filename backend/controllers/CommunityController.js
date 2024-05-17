const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const Community = require("../models/CommunityModel");
const Community_Content = require("../models/CommunityContentModel");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const nodemailer = require("nodemailer");

const createcommunity = asyncHandler(async (req, res) => {
  const { Admin_ID, Community_Name, Community_Description } = req.body;
  const { Community_Image, Community_Cover_Image } = req.files;
  const imageUrl = await uploadImageToS3(Community_Image);
  const coverimageURL = await uploadImageToS3(Community_Cover_Image);
  const createcommunity = await Community.create({
    Admin_ID: Admin_ID,
    Community_Name: Community_Name,
    Community_Image: imageUrl,
    Community_Description: Community_Description,
    Community_Cover_Image: coverimageURL,
  });

  res.status(201).json(createcommunity);
});
const getcommunity = asyncHandler(async (req, res) => {
  try {
    const adminId = req.params.id;
    const communities = await Community.find({ Admin_ID: adminId });

    res.status(200).json(communities);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const showresultsforonecommunity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const showresultsforoneuser = await Community.find({ _id: id })
    .populate({
      path: "Members",
      select: "requestStatus user_id",
      populate: {
        path: "user_id",
        select: "user_name image AccountStatus",
      },
    })
    .select(
      "Admin_ID Members Community_Name Communiy_Description Community_Cover_Image Community_Image"
    );
  res.status(200).json(showresultsforoneuser);
  console.log(showresultsforoneuser);
});


const sendrequestforinvites = asyncHandler(async (req, res) => {
  const { Admin_ID, user_id, Community_ID } = req.body;
  //Who is Admin Sending Invite to Join
  const InvitedUser = await Users.findOne({ _id: user_id });
  //Who is Inviting user(Admin of Community)
  const AdminSendingInvitation = await Users.findOne({ _id: Admin_ID });
  //For Which Community is Admin sending request
  const ForWhichCommunity = await Community.findOne({ _id: Community_ID });

  //Notifying Mail for this
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
  var mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: InvitedUser.email,
    subject: "Invitation in Pending",
    html: `
    <html>
    <head>
      <style>
        body {
          background-color: #f5f5f5; /* Light gray background color */
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #ffffff; /* White container background color */
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin: 20px auto;
          padding: 20px;
          text-align: center;
          width: 80%;
        }
        h1 {
          color: #333333; /* Dark gray text color */
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          color: #555555; /* Medium gray text color */
        }
        .profile-photo {
          border-radius: 50%;
          height: 100px;
          margin-bottom: 10px;
          width: 100px;
        }
        .comment-profile-photo{
          width: 34px;
          height: 34px;
          border-radius: 50%;  
        }
        .cta-button {
          background-color: #007bff; /* Blue button color */
          border: none;
          border-radius: 5px;
          color: #ffffff; /* White button text color */
          display: inline-block;
          font-size: 16px;
          margin-top: 20px;
          padding: 10px 20px;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <img src="${ForWhichCommunity.Community_Image}" alt="Community Profile" class="profile-photo">
        <h1>Invitation to Join Community ${ForWhichCommunity.Community_Name}<h1>
        <p> sent by <img src="${AdminSendingInvitation.image}" alt="Admin Profile" class="comment-profile-photo">${AdminSendingInvitation.user_name}</p><br/><br/>
        <p>You've been invited to join the community. Click the link below to accept the invitation.</p>
        <a href="https://localhost:3000/dashboard/" class="cta-button">Click Here to be redirected</a>
      </div>
    </body>
    </html>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  const memberStatus = "invited";
  const newMember = { user_id, memberStatus };

  const updateMembers = await Community.updateOne(
    { _id: Community_ID },
    { $push: { Members: newMember } }
  );
});

module.exports = {
  createcommunity,
  getcommunity,
  showresultsforonecommunity,
  sendrequestforinvites,
};
