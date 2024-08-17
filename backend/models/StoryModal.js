const { Int32 } = require("bson");
const mongoose = require("mongoose");

const StorySchema = mongoose.Schema(
  {
    story_posting_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    image: {
      type: String,
    },
    VideoUrl: {
      type: String,
    },
    liked_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "24h",
    },
  },
  { collection: "Story", timestamp: true }
);

module.exports = mongoose.model("Story", StorySchema);
