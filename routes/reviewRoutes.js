const { addReviewController, deleteReview } = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

// add review
router.post("/add/:courseId", verifyToken, addReviewController)

// delete review
router.delete("/delete/:reviewId", verifyToken, deleteReview)

module.exports = router;
