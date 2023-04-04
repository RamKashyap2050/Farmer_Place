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
    image: {
        data:Buffer,
        ContentType: String
    },
},
{   collection: 'Feed',
    timestamp: true
}) 

module.exports = mongoose.model('Feed', feedSchema)