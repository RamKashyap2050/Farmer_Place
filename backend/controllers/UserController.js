const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




//Function that enables us to Signup
const registerUser = asyncHandler(async(req, res) => {
    const {user_name, phone, email, password} = req.body

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
        password: hashedPassword
    })

    if(!user){
        res.status(400)
        throw new Error("Account not registered")
    }

    res.status(201).json({
        _id: user.id,
        user_name: user.user_name,
        phone: user.phone,
        email: user.email,
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
  
    if (req.admin && req.user._id.toString() !== userdelete.user.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    } else {
      const deletedUser = await Users.deleteOne({ _id: req.params.id });
      res.json({ message: 'User deleted successfully', data: deletedUser });
    }
  });


//Function that enables to Logout

//To Generate Tokens
const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerUser, loginUser, deleteUser}