const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    video: {
      type: Object,
      default: {
        src: "",
        publicId: null,
      },
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const Lessons = mongoose.model("Lesson", lessonSchema);

module.exports = {
  Lessons,
};
