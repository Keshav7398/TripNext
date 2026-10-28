const express = require("express");
const router = express.Router({ mergeParams: true }); // 🔥 REQUIRED

const Listing = require("../models/listing");
const Review = require("../models/review");

const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isReviewOwner, isLogin } = require("../middleware");

const ReviewsController = require("../controllers/reviews");


// ================= CREATE REVIEW =================
router.post(
  "/",
  isLogin,
  validateReview,
  wrapAsync(ReviewsController.createReview)
);


// ================= DELETE REVIEW =================
router.delete(
  "/:reviewId",
  isLogin,
  isReviewOwner,
  wrapAsync(ReviewsController.deleteReview)
);

module.exports = router;
