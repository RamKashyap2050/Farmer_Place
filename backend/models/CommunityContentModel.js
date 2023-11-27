const mongoose = require("mongoose");

const communitySchema = mongoose.Schema(
  {
    Community_ID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Community",
    },
    User_ID:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Users"
    },
    Post_Image: {
      type: String,
    },
    Content: {
      type: String,
    },
  },
  {
    collection: "CommunityContent",
    timestamp: true,
  }
);

module.exports = mongoose.model("CommunityContent", communitySchema);
