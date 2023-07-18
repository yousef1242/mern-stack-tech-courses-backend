const asyncHandler = require("express-async-handler");
const { Reviews } = require("../models/reviews");

// add review
const addReviewController = asyncHandler(async (req, res) => {
  const newReview = await new Reviews({
    title: req.body.title,
    userId: req.user.id,
    courseId: req.params.courseId,
    rating: req.body.rating,
  });
  const saveReview = await newReview.save();
  res
    .status(200)
    .json({ message: "Review has been added", review: saveReview });
});

// delete review
const deleteReview = asyncHandler(async (req, res) => {
  await Reviews.findByIdAndDelete(req.params.reviewId);
  res.status(200).json({ message: "Review has been deleted" });
});

module.exports = { addReviewController, deleteReview };
