const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { use } = require('../routes/userRoutes')
// const multer = require('multer')


// //Storage Function for Multer
// const Storage = multer.diskStorage({
//   destination: 'uploads',
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// })

//Uploads CMD
// const upload = multer({ dest: 'uploads/' })

//Function that enables us to Signup
const registerUser = asyncHandler(async(req, res) => {
    const {user_name, phone, email, password} = req.body
    const image = req.files.image
    if(!user_name || !phone || !email || !password){
        res.status(400)
        throw new Error("Please enter all the fields!")
    }

    const userExists = await Users.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
        user_name, 
        phone, 
        email, 
        password: hashedPassword,
        image: image

})
    
    if(!user){
        res.status(400)
        throw new Error("Account not registered")
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
            html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><h1>Happy to see you ${user.user_name}</h1><br><p style="color: #0000ff;">Thanks for signing up to Farmer Place!</p><br><br><a href="https://localhost:3000/dashboard/">Click Here to get started</a></div></body></html>`
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
        token: await generateToken(user.id),
        message: "You are registered"
    })

})
  


//Function which enables User to Login
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const user = await Users.findOne({email})

    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            _id: user.id,
            user_name: user.user_name,
            phone: user.phone,
            email: user.email,
            token: await generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})


//Function that enables us to Delete our account 
const deleteUser = asyncHandler(async (req, res) => {
    const userdelete = await Users.findById(req.params.id);
  
    if (req.user && req.user._id.toString() !== userdelete.user.toString()) {
      res.status(401);
      throw new Error('User not authorized');
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
        html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><h1>Please Help us ${userdelete.user_name} to Improve by giving feedback </h1><br><br><br><a href="https://localhost:3000/feedback/">Click Here to give a Feedback</a><br /><br /><a href="https://localhost:3000/signupuser">Click Here if you did it by Mistake</a></div></body></html>`
    };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      const deletedUser = await Users.deleteOne({ _id: req.params.id });
      res.json({ message: 'User deleted successfully', data: deletedUser });
    
    }


  });

const getAllusers = asyncHandler(async(req,res) => {
const getAllusers = await Users.find();

})
//Function that enables to Reset Password

//To Generate Tokens
const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerUser, loginUser, deleteUser, getAllusers}