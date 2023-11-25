const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
  Community_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Community',
  },
  Title: {
    type: String,
    required: true
  },
  Post_Image: {
    type: String
  },
  Content:{
    type: String
  }

},
{
  collection: 'Community',
  timestamp: true
});

module.exports = mongoose.model('Community', communitySchema);
