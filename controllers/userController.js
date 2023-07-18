const asyncHandler = require("express-async-handler");
const { User } = require("../models/user");
const cloudinary = require("../lib/cloudinary");

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select("-password");
  res.status(200).json(users);
});

// get all users count
const getAllUsersCount = asyncHandler(async (req, res) => {
  const count = await User.count();
  res.status(200).json(count);
});

// get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate("subscribeIn")
    .populate("wishlist")
    .populate({
      path: "wishlist",
      populate: {
        path: "lessons",
      },
    })
    .populate({
      path: "subscribeIn",
      populate: {
        path: "lessons",
      },
    });
  if (!user) {
    return res.status(400).json({ message: "User is not found" });
  }
  res.status(200).json(user);
});

// update user info
const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "User is not found" });
  }
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    return res.status(400).json({ message: "Email already exist" });
  }
  const newUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    },
    { new: true }
  );
  res.status(200).json(newUser);
});

// update user profile image
const updateUserProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "User is not found" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }
  const uploadImage = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "image",
  });
  if (user.profileImage.publicId !== null) {
    cloudinary.uploader.destroy(user.profileImage.publicId);
  }
  const imageProfile = {
    url: uploadImage.secure_url,
    publicId: uploadImage.public_id,
  };
  const newUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        profileImage: imageProfile,
      },
    },
    { new: true }
  );
  res.status(200).json(newUser);
});

// delete profile user
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "User is not found" });
  }
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ message: "User has been deleted" });
});

// delete profile user
const addWishlistForUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  const user = await User.findById(userId);
  const isAddToWishlist = await user.wishlist.find(
    (wish) => wish._id.toString() === courseId
  );
  if (isAddToWishlist) {
    const newUserWishlist = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { wishlist: courseId },
      },
      { new: true }
    ).populate("wishlist");
    res
      .status(200)
      .json({ message: "Course delete from favourite", newUserWishlist });
  } else {
    const newUserWishlist = await User.findByIdAndUpdate(
      userId,
      {
        $push: { wishlist: courseId },
      },
      { new: true }
    ).populate("wishlist");
    res
      .status(200)
      .json({ message: "Course add in favourite", newUserWishlist });
  }
});

// delete profile user
const addCourseToSubscribeInforUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { subscribeIn: courseId },
    },
    { new: true }
  );
  res.status(200).json(user);
});

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  updateUserProfileImage,
  deleteUserProfile,
  addWishlistForUser,
  addCourseToSubscribeInforUser,
  getAllUsersCount,
};
