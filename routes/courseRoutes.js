const router = require("express").Router();
const {
  createCourseController,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  getCoursesByCategory,
  updateCourseInfo,
  addUserSubscibeToCourse,
  deleteAllCourses,
} = require("../controllers/courseController");
const storage = require("../lib/multer");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");

// get single course
// create course
router.post(
  "/add",
  verifyToken,
  verifyTokenAndAdmin,
  storage.single("file"),
  createCourseController
);
router.get("/:courseId", getSingleCourse);

// get all courses
router.get("/", getAllCourses);

// get courses by category

// update course info
router.put(
  "/update/:courseId",
  verifyToken,
  verifyTokenAndAdmin,
  updateCourseInfo
);

// add subscibe user to course
router.put("/add-subscribe/:courseId", verifyToken, addUserSubscibeToCourse);

// delete course
router.delete(
  "/delete/:courseId",
  verifyToken,
  verifyTokenAndAdmin,
  deleteCourse
);

// delete course
router.delete(
  "/delete",
  verifyToken,
  verifyTokenAndAdmin,
  deleteAllCourses
);

router.get("/category/:category", getCoursesByCategory);

module.exports = router;
