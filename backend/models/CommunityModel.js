const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
  Admin_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  Members: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    requestStatus:{
      type: String,
      default: 'invited'
    } 
  }],
  Community_Name: {
    type: String,
    required: true
  },
  Community_Image: {
    type: String
  },
  Community_Cover_Image:{
    type: String
  },
  Community_Description:{
    type: String
  }

},
{
  collection: 'Community',
  timestamp: true
});

module.exports = mongoose.model('Community', communitySchema);
