const { Int32 } = require('bson')
const mongoose = require('mongoose')

const SubscriberSchema = mongoose.Schema({
    
    subscriber:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Users',
    },
    SubscribedTo:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
  },
Subscription_title: {
  type: String,
  required: [true, 'Please enter a Title']
},
Subscription_content: {
  type: String,
  required: [true, 'Please enter Content']
},
post_image: {
 type:String
},

FeedStatus: {
  type: Boolean,
  default: true
}

},
{   collection: 'SavedPosts',
    timestamp: true
}) 

module.exports = mongoose.model('SavedPosts', SaveSchema)