const {
  registerController,
  loginController,
} = require("../controllers/authController");
const router = require("express").Router();
const storage = require("../lib/multer");

// register
router.post("/register", storage.single("file"), registerController);

// login
router.post("/login", loginController);

module.exports = router;
