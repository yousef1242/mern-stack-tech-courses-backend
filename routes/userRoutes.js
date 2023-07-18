const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  updateUserProfileImage,
  deleteUserProfile,
  addWishlistForUser,
  addCourseToSubscribeInforUser,
  getAllUsersCount,
} = require("../controllers/userController");
const storage = require("../lib/multer");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");

// get all users
router.get("/", verifyToken, verifyTokenAndAdmin, getAllUsers);

// get all users count
router.get("/count", getAllUsersCount);

// get single user
router.get("/:userId", getSingleUser);

// update user info
router.put("/update-info/:userId", verifyToken, updateUserInfo);

// update user profile image
router.put("/update-image/:userId", verifyToken, storage.single("file"), updateUserProfileImage);

// update user profile image
router.delete("/delete/:userId", verifyToken, deleteUserProfile);

// add wishlist to user
router.put("/wishlist/:courseId", verifyToken, addWishlistForUser);

// add subscribe to user
router.put("/subscribe/:courseId", verifyToken, addCourseToSubscribeInforUser);

module.exports = router;
