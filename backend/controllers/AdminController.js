
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModal') 
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



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

const deleteUserbyAdmin = asyncHandler(async (req, res) => {
    const userdelete = await Users.findById(req.params.id);
     
      const deletedUser = await Users.deleteOne({ _id: req.params.id });
      res.json({ message: 'User deleted successfully', data: deletedUser });
  });

//Function that fetches all users for Admin 
const getallUsers = asyncHandler(async (req,res) => {
    const getallUsers = await Users.find({})

    res.status(200).json(getallUsers)
})

//Function to generate tokens
const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {loginAdmin, deleteUserbyAdmin, getallUsers}