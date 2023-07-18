const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    courseId: {
      type: String,
    },
    userId: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Review", reviewsSchema);

module.exports = {
  Reviews,
};
