const asyncHandler = require("express-async-handler");
const cloudinary = require("../lib/cloudinary");
const { Lessons } = require("../models/lesson");
const { Courses } = require("../models/course");

// create lesson
const createLessonController = asyncHandler(async (req, res) => {
  const video = {};
  const course = await Courses.findById(req.params.courseId);
  if (!course) {
    res.status(200).json({ message: "Course id is not found" });
  }
  let duration;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });
    video.src = result.secure_url;
    video.publicId = result.public_id;
    duration = result.duration;
  }

  const newLesson = await new Lessons({
    title: req.body.title,
    courseId: req.params.courseId,
    video: video,
    duration: duration,
  });
  const saveLesson = await newLesson.save();
  res
    .status(200)
    .json({ message: "Lesson has been created", saveLesson: saveLesson });
});
// get all lessons
const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lessons.find({});
  res.status(200).json(lessons);
});

// delete lesson
const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lessons.findById(req.params.lessonId);
  if (!lesson) {
    return res.status(400).json({ message: "Lesson is not found" });
  }
  if (lesson.video.publicId && lesson.video.publicId !== null) {
    cloudinary.uploader.destroy(lesson.video.publicId);
  }
  await Lessons.findByIdAndDelete(req.params.lessonId);
  res.status(200).json({ message: "Lesson has been deleted" });
});

// delete lesson
const updateLesson = asyncHandler(async (req, res) => {
  const lesson = await Lessons.findById(req.params.lessonId);
  if (!lesson) {
    return res.status(400).json({ message: "Lesson is not found" });
  }
  if (lesson.video.publicId !== null) {
    await Lessons.findByIdAndDelete(req.params.lessonId);
    await cloudinary.uploader.destroy(lesson.video.publicId);
  }
  res.status(200).json({ message: "Lesson has been deleted" });
});

module.exports = {
  createLessonController,
  deleteLesson,
  updateLesson,
  getAllLessons,
};
