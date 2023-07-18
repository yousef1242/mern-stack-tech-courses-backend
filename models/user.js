const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: Object,
      default: {
        url: "https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?pid=ImgDet&rs=1",
        publicId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    subscribeIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
