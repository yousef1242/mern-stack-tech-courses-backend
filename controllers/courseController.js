const asyncHandler = require("express-async-handler");
const cloudinary = require("../lib/cloudinary");
const { Courses } = require("../models/course");
const { Lessons } = require("../models/lesson");

// create course
const createCourseController = asyncHandler(async (req, res) => {
  let image = {};
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });
    image = {
      src: result.secure_url,
      publicId: result.public_id,
    };
  }
  if (req.body.imageLink) {
    image.src = req.body.imageLink;
  }
  const newCourse = await new Courses({
    title: req.body.title,
    image: image,
    category: req.body.category,
    description: req.body.description,
    requirements: req.body.requirements,
    price: req.body.price,
    whatYouWillLearn: req.body.whatYouWillLearn,
    discount: req.body.discount,
    instructor: req.body.instructor,
  });
  const saveCourse = await newCourse.save();
  res.status(200).json({ message: "Course has been created", saveCourse });
});

// get all courses
const getSingleCourse = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.courseId)
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "userId",
        model: "User",
      },
    })
    .populate("lessons");
  res.status(200).json(course);
});

// get all courses
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find({})
    .sort({ createdAt: -1 })
    .populate("reviews")
    .populate("lessons");
  res.status(200).json(courses);
});

// delete course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.courseId);
  await Courses.findByIdAndDelete(req.params.courseId);
  await Lessons.deleteMany({ courseId: course._id });
  res.status(200).json({ message: "Course has been deleted" });
});

// delete course
const deleteAllCourses = asyncHandler(async (req, res) => {
  await Courses.deleteMany();
  await Lessons.deleteMany();
  res.status(200).json({ message: "Courses has been deleted" });
});

// get courses by category
const getCoursesByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const courses = await Courses.find({ category: category })
      .sort({ createdAt: -1 })
      .populate("lessons");
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
  }
});

// update course info
const updateCourseInfo = asyncHandler(async (req, res) => {
  const newCourse = await Courses.findByIdAndUpdate(
    req.params.courseId,
    {
      $set: {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        requirements: req.body.requirements,
        price: req.body.price,
        whatYouWillLearn: req.body.whatYouWillLearn,
        discount: req.body.discount,
        instructor: req.body.instructor,
      },
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Course has been updated", newCourse: newCourse });
});

// add subscibe user to course
const addUserSubscibeToCourse = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const newCourse = await Courses.findByIdAndUpdate(
    req.params.courseId,
    {
      $push: {
        userSubscribeIn: userId,
      },
    },
    { new: true }
  );
  res.status(200).json(newCourse);
});

module.exports = {
  createCourseController,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  getCoursesByCategory,
  updateCourseInfo,
  addUserSubscibeToCourse,
  deleteAllCourses,
};
