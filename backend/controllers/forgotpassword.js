const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const decoded = require('../middlewares/protect')

// const forgotpassword = asyncHandler(async (req, res) => {
//     const { email } = req.body;
//     try {
//       const oldUser = await User.findOne({ email });
//       if (!oldUser) {
//         return res.json({ status: "User Not Exists!!" });
//       }
//       const secret = process.env.JWT_SECRET + oldUser.password;
//       const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//         expiresIn: "5m",
//       });
//       const link = `http://localhost:3000/reset-password/${oldUser._id}&:${token}`;
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.NODE_MAILER_USER,
//           pass: process.env.NODE_MAILER_PASS,
//         },
//       });
  
//       var mailOptions = {
//         from:  process.env.NODE_MAILER_USER,
//         to: oldUser.email,
//         subject: "Password Reset",
//         text: link,
//       };
  
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });
//       console.log(link);
//     } catch (error) { }
//   });
  
//   const resetpassword = asyncHandler(async (req, res) => {
//     const { id, token } = req.params;
//     console.log(req.params);
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       res.json({email: verify.email, status: "Not Verified" });
//     } catch (error) {
//       console.log(error);
//       res.send("Not Verified");
//     }
//   });
  
//   const resetpassword1 = asyncHandler(async (req, res) => {
//     const { id, token } = req.params;
//     const { password } = req.body;
  
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       const encryptedPassword = await bcrypt.hash(password, 10);
//       await User.updateOne(
//         {
//           _id: id,
//         },
//         {
//           $set: {
//             password: encryptedPassword,
//           },
//         }
//       );
  
//       res.json({ status: "verified" });
//       console.log("Yes")
//     } catch (error) {
//       console.log(error);
//       res.json({ status: "Something Went Wrong" });
//     }
//   });

//   module.exports = {forgotpassword, resetpassword, resetpassword1 }


const keysecret = process.env.JWT_SECRET

// send email Link For reset Password
const sendpasswordlink = asyncHandler(async(req,res)=>{
  console.log(req.body)

  const {email} = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
      const userfind = await User.findOne({ email });

      // token generate for reset password
      const token = jwt.sign({id: userfind._id},keysecret,{
          expiresIn:"120s"
      });
      
   
        var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.NODE_MAILER_USER,
                    pass: process.env.NODE_MAILER_PASS,
                  },
                });
           const link = `http://localhost:3000/reset-password/${userfind._id}/${token}`
          const mailOptions = {
              from:process.env.NODE_MAILER_USER,
              to: userfind.email,
              subject:"Sending Email For password Reset",
              html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><br><p style="color: #0000ff;">You are Just one Click away from Resetting your Password</p><br><br><a href=${link}>Click Here to get started</a></div></body></html>`          }

          transporter.sendMail(mailOptions,(error,info)=>{
              if(error){
                  console.log("error",error);
                  res.status(401).json({status:401,message:"email not send"})
              }else{
                  console.log("Email sent",info.response);
                  res.status(201).json({status:201,message:"Email sent Succsfully"})
              }
          })


  } catch (error) {
      res.status(401).json({status:401,message:"invalid user"})
  }

});


// verify user for forgot password time
const forgotpassword =  asyncHandler(async(req,res)=>{
  const {id,token} = req.params;

  try {
      const validuser = await User.findOne({_id:id,token});
      

      if(validuser){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
});


// change password

const changepassword = asyncHandler(async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await User.findOne({_id:id});
      

      if(validuser){
          const newpassword = await bcrypt.hash(password,10);

          const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
})



module.exports = {changepassword, forgotpassword, sendpasswordlink}

