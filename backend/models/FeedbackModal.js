const { Int32 } = require('bson')
const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    
    user:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Users',
        },
    subject: {
        type: String,
        required: [true, 'Please enter a Title']
    },
    message: {
        type: String,
        required: [true, 'Please enter Content']
    },
},
{   collection: 'Feed',
    timestamp: true
}) 

module.exports = mongoose.model('Feedback', feedbackSchema)