const mongoose = require("mongoose");

const coursesShcema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: Object,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    requirements: {
      type: String,
    },
    instructor: {
      type: String,
    },
    price: {
      type: Number,
    },
    whatYouWillLearn: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    userSubscribeIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

coursesShcema.virtual("reviews", {
  ref: "Review",
  foreignField: "courseId",
  localField: "_id",
});
coursesShcema.virtual("lessons", {
  ref: "Lesson",
  foreignField: "courseId",
  localField: "_id",
});

const Courses = mongoose.model("Course", coursesShcema);

module.exports = {
  Courses,
};
