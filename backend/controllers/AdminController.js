const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModal') 
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Feed = require('../models/FeedModel')
const MarketPlace = require('../models/MarketPlaceModel')
const nodemailer = require('nodemailer')

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
        throw new Error("Incorrect Admin credentails")
    }
})

 

//Function that enables Account status of User
const blockbyadmin =  asyncHandler(async(req,res) => {
 try{
    const user = await Users.findByIdAndUpdate(
        req.params.id, 
        { AccountStatus: false }, // set the account_status to false
        { new: true } // return the updated document
      );
      const userformail = await Users.findById({ _id : req.params.id })

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS,
        },
      });
     const mailOptions = {
        from:process.env.NODE_MAILER_USER,
        to: userformail.email,
        subject:"Blocked Account",
        html: `<html><head></head><body><div><br><p> Hello ${userformail.user_name} Your account has been blocked by Admin<br />All your Content and Listings has been put on hold <br /><br/> Contact Admin @thefarmerplace62@gmail.com for more details. </p><br><br></div></body></html>`          }

     transporter.sendMail(mailOptions,(error,info)=>{
     if(error){
        console.log("error",error);
        res.status(401).json({status:401,message:"email not send"})
     }else{
        console.log("Email sent",info.response);
        res.status(201).json({status:201,message:"Email sent Succsfully"})
     }
    })
}
    catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
      }

})
//Function that gives rights for Admin to Block a Post
const blockpostbyadmin = asyncHandler(async(req,res) => {
try{
    const feed = await Feed.findByIdAndUpdate(
        req.params.id,
        {FeedStatus: false},
        {new: true}
    ).populate('user')

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
   const mailOptions = {
      from:process.env.NODE_MAILER_USER,
      to: feed.user.email,
      subject:"Blocked Post",
      html:`<html>
      <head></head>
      <body style="background-color: #f2f2f2; text-align: center; padding: 0 20px;">
        <div style="text-align: left;">
          <br>
          <p>
            We are sorry to inform you that your post featuring <h3>${feed.title}</h3> has been taken down by FarmerPlace as it crosses our community guidelines
            <br><br>
            For reference refer to <a href='www.google.com'>FarmerPlace</a>
            <br><br>
            Contact Admin for more details
          </p>
          <br><br>
        </div>
      </body>
    </html>`}
    
   transporter.sendMail(mailOptions,(error,info)=>{
   if(error){
      console.log("error",error);
      res.status(401).json({status:401,message:"email not send"})
   }else{
      console.log("Email sent",info.response);
      res.status(201).json({status:201,message:"Email sent Succsfully"})
   }
  })
}
catch(error){
    console.log("Error Blocking Post:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
}
})

//Function that gives rights for Admin to Unblock a Post
const unblockpostbyadmin = asyncHandler(async(req,res) => {
try{
    const feed = await Feed.findByIdAndUpdate(
        req.params.id,
        {FeedStatus: true},
        {new: true}
    ).populate('user')
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS,
        },
      });
     const mailOptions = {
        from:process.env.NODE_MAILER_USER,
        to: feed.user.email,
        subject:"Unblocked Post",
        html:`<html>
        <head></head>
        <body style="background-color: #f2f2f2; text-align: center; padding: 0 20px;">
          <div style="text-align: left;">
            <br>
            <p>
              We are Happy to inform you that your post featuring <h3>${feed.title}</h3> has been brought back by FarmerPlace as it passes the gudielines test
              <br><br>
              For reference refer to <a href='www.google.com'>FarmerPlace</a>
              <br><br>
              Contact Admin for more details
            </p>
            <br><br>
          </div>
        </body>
      </html>`}
      
     transporter.sendMail(mailOptions,(error,info)=>{
     if(error){
        console.log("error",error);
        res.status(401).json({status:401,message:"email not send"})
     }else{
        console.log("Email sent",info.response);
        res.status(201).json({status:201,message:"Email sent Succsfully"})
     }
    })
}
catch(error){
    console.log("Error Unblocking Post:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
}
})




//Function that enables Account status of User
const unblockbyadmin =  asyncHandler(async(req,res) => {
    try{
    const user = await Users.findByIdAndUpdate(
        req.params.id, 
        { AccountStatus: true }, // set the account_status to false
        { new: true } // return the updated document
      );
      const userformail = await Users.findById({ _id : req.params.id })

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS,
        },
      });
     const mailOptions = {
        from:process.env.NODE_MAILER_USER,
        to: userformail.email,
        subject:"Unblocked Account",
        html: `<html><head></head><body><div><br><p> Hip Hip Hurray ${userformail.user_name} your account has been unblocked by Admin<br />We are happy to see you back again  <br /><br/> Have happy blogging at Farmer Place </p><br><br></div></body></html>`          }

     transporter.sendMail(mailOptions,(error,info)=>{
     if(error){
        console.log("error",error);
        res.status(401).json({status:401,message:"email not send"})
     }else{
        console.log("Email sent",info.response);
        res.status(201).json({status:201,message:"Email sent Succsfully"})
     }
    })
}
    catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
      }
})
//Function that fetches all users for Admin 
const getallUsers = asyncHandler(async (req,res) => {
    const getallUsers = await Users.find({})

    res.status(200).json(getallUsers)
})



//Function to get all the Listings
const getallProducts = asyncHandler(async (req, res) => {
    const getallproducts = await MarketPlace.find()
      .populate("user", "user_name image email")
      .select("product_name product_price product_description user product_image");
  
    res.status(200).json(getallproducts);
  });


  
//Function to delete Listings
const deleteListings = asyncHandler(async(req,res) => {
    const deletedListing = await MarketPlace.deleteOne({ _id: req.params.id });
    res.json({ message: 'Lisiting deleted successfully', data: deletedListing });
}) 



//Function to get all the Posts
const getallPosts = asyncHandler(async (req, res) => {
    const getallposts = await Feed.find()
      .populate("user", "user_name image email")
      .select("title content user post_image FeedStatus");
  
    res.status(200).json(getallposts);
  });
 //Funcction to delete Posts by users 
 const deleteFeed = asyncHandler(async(req,res) => {
    const deletedFeed = await Feed.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post deleted successfully', data: deletedFeed });
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
module.exports = {loginAdmin, 
    blockbyadmin,
    unblockbyadmin, 
    getallUsers,
    getallPosts,
    getallProducts, 
    sendpasswordlinkforAdmin, 
    changepasswordAdmin, 
    forgotpasswordAdmin,
    deleteListings,
    deleteFeed,
    blockpostbyadmin,
    unblockpostbyadmin

}