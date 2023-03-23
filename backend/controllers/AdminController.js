
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
console.log(admin)
    if(password == admin.password){
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
  
    if (req.admin && req.admin._id.toString() !== userdelete.admin.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    } else {
      const deletedUser = await Users.deleteOne({ _id: req.params.id });
      res.json({ message: 'User deleted successfully', data: deletedUser });
    }
  });

//Function to generate tokens
const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {loginAdmin, deleteUserbyAdmin}