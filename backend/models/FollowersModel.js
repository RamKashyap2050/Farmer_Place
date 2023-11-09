const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
  followed_by_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  following_to_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  requestStatus: {
    type: String, 
  },
},
{
  collection: 'Followers',
  timestamp: true
});

module.exports = mongoose.model('Followers', followerSchema);
