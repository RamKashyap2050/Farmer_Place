const { Int32 } = require('bson')
const mongoose = require('mongoose')

const SaveSchema = mongoose.Schema({
    
    saving_user_id:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Users',
    },
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Feed',
  }
},
{   collection: 'SavedPosts',
    timestamp: true
}) 

module.exports = mongoose.model('SavedPosts', SaveSchema)