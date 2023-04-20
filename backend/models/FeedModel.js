const { Int32 } = require('bson')
const mongoose = require('mongoose')

const feedSchema = mongoose.Schema({
    
    user:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Users',
    },
    title: {
        type: String,
        required: [true, 'Please enter a Title']
    },
    content: {
        type: String,
        required: [true, 'Please enter Content']
    },
    post_image: {
        data:Buffer,
        ContentType: String
    },
    
    FeedStatus: {
        type: Boolean,
        default: true
    },
    liked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    disliked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    comments: [{
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
        },
        comment: String
      }]
},
{   collection: 'Feed',
    timestamp: true
}) 

module.exports = mongoose.model('Feed', feedSchema)