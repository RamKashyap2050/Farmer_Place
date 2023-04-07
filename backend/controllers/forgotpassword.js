const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


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
              html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><br><p style="color: #0000ff;">You are Just one Click away from Resetting your Password</p><br><br><a href=${link}>Click Here</a></div></body></html>`          }

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

