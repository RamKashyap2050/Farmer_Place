const { Int32 } = require('bson')
const mongoose = require('mongoose')

const followerSchema = mongoose.Schema({
    
    followerID:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Users',
    },
    followingID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
  }
},
{   collection: 'Followers',
    timestamp: true
}) 

module.exports = mongoose.model('Followers', followerSchema)