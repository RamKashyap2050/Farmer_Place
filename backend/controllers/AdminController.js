
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModal') 
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { deleteOne } = require('../models/adminModal')



//Function which enables User to Login
const loginAdmin = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const admin = await Admin.findOne({email})
    if(admin && await bcrypt.compare(password, admin.password)){
        res.status(200).json({
            _id: admin.id,
            user_name: admin.admin_name,
            phone: admin.phone,
            email: admin.email,
            token: await generateToken(admin.id)
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})

 
//Function that enables to Logout

//Function that enables us to Delete User accounts

// const deleteUserbyAdmin = asyncHandler(async (req, res) => {
//     const userdelete = await Users.findById({ _id: req.params.id});
//     const deletedUser = await Users.deleteOne({ _id: req.params.id });
//     res.json({ message: 'User deleted successfully', data: deletedUser });

// });

//Function that enables Account status of User
const blockbyadmin =  asyncHandler(async(req,res) => {
    const user = await Users.findByIdAndUpdate(
        req.params.id, 
        { AccountStatus: false }, // set the account_status to false
        { new: true } // return the updated document
      );

})

//Function that enables Account status of User
const unblockbyadmin =  asyncHandler(async(req,res) => {
    const user = await Users.findByIdAndUpdate(
        req.params.id, 
        { AccountStatus: true }, // set the account_status to false
        { new: true } // return the updated document
      );

})
//Function that fetches all users for Admin 
const getallUsers = asyncHandler(async (req,res) => {
    const getallUsers = await Users.find({})

    res.status(200).json(getallUsers)
})



const keysecret = process.env.JWT_SECRET

// send email Link For reset Password
const sendpasswordlinkforAdmin = asyncHandler(async(req,res)=>{
  const {email} = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
      const Adminfind = await Admin.findOne({ email });

      // token generate for reset password
      const token = jwt.sign({id: Adminfind._id},keysecret,{
          expiresIn:"120s"
      });
      
   
        var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.NODE_MAILER_USER,
                    pass: process.env.NODE_MAILER_PASS,
                  },
                });
           const link = `http://localhost:3000/reset-password-admin/${Adminfind._id}/${token}`
          const mailOptions = {
              from:process.env.NODE_MAILER_USER,
              to: Adminfind.email,
              subject:"Sending Email For password Reset",
              html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><br><p style="color: #0000ff;">${Adminfind.user_name}You are Just one Click away from Resetting your Password</p><br><br><a href=${link}>Click Here to get started</a></div></body></html>`          }

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
const forgotpasswordAdmin =  asyncHandler(async(req,res)=>{
  const {id,token} = req.params;

  try {
      const validAdmin = await Admin.findOne({_id:id,token});
      

      if(validAdmin){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
});


// change password

const changepasswordAdmin = asyncHandler(async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validAdmin = await Admin.findOne({_id:id});
      

      if(validAdmin){
          const newpassword = await bcrypt.hash(password,10);

          const setnewuserpass = await Admin.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
})



//Function to generate tokens
const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {loginAdmin, blockbyadmin,unblockbyadmin, getallUsers, sendpasswordlinkforAdmin, changepasswordAdmin, forgotpasswordAdmin}