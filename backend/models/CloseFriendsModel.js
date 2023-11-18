const mongoose = require('mongoose');

const closefriendSchema = mongoose.Schema({
  user_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  Close_Friend_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  }
},
{
  collection: 'CloseFriends',
  timestamp: true
});

module.exports = mongoose.model('CloseFriends', closefriendSchema);
