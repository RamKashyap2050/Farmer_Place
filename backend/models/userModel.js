const { Int32 } = require("bson");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    image: {
      type: String,
      default:
        "https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg",
    },
    AccountStatus: {
      type: Boolean,
      default: true,
    },
    PrivateAccount: {
      type: Boolean,
      default: false,
    },
    OnlyFollowers: {
      type: Boolean,
      default: false,
    },
    IsSubscriber: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Users", timestamp: true }
);

module.exports = mongoose.model("Users", userSchema);
