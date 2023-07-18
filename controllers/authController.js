const asyncHandler = require("express-async-handler");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const cloudinary = require("../lib/cloudinary");

// register
const registerController = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }
  const uploadImage = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "image",
  });
  const hashPassowrd = await bcrypt.hash(req.body.password, 10);
  const imageProfile = {
    url: uploadImage.secure_url,
    publicId: uploadImage.public_id,
  };
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    profileImage: imageProfile,
    password: hashPassowrd,
  });
  const saveUser = await newUser.save();
  res.status(200).json({ message: "You registered successfully", saveUser });
});

// Login
const loginController = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }
  const comparePassord = await bcrypt.compare(req.body.password, user.password);
  if (!comparePassord) {
    return res.status(400).json({ message: "Password doesn't match" });
  }
  const token = JWT.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    id: user._id,
    isAdmin: user.isAdmin,
    token,
  });
});

module.exports = {
  registerController,
  loginController,
};
