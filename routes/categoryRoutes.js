const router = require("express").Router();
const {
  createCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");

// create category
router.post("/add", verifyToken, verifyTokenAndAdmin, createCategory);

// create category
router.get("/", getAllCategory);

// create category
router.delete(
  "/delete/:categoryId",
  verifyToken,
  verifyTokenAndAdmin,
  deleteCategory
);

module.exports = router;
