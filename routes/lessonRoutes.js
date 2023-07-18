const router = require("express").Router();
const { createLessonController, deleteLesson, getAllLessons } = require("../controllers/lessonController");
const storage = require("../lib/multer");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");

// create lesson
router.post(
  "/add/:courseId",
  verifyToken,
  verifyTokenAndAdmin,
  storage.single("file"),
  createLessonController
);

// delete lesson
router.delete(
  "/delete/:lessonId",
  verifyToken,
  verifyTokenAndAdmin,
  deleteLesson
);

// delete lesson
router.get(
  "/",
  verifyToken,
  verifyTokenAndAdmin,
  getAllLessons
);

module.exports = router;
