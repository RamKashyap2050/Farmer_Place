const { Int32 } = require('bson')
const mongoose = require('mongoose')

const feedSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone']
    },
    image: {
        data:Buffer,
        ContentType: String
    },
    AccountStatus: {
        type: Boolean,
        default: true
    }
},
{   collection: 'Feed',
    timestamp: true
}) 

module.exports = mongoose.model('Feed', feedSchema)