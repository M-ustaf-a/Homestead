const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require( "../middleware.js" );
const {validateReview} = require("../middleware.js")
const reviewController = require("../controllers/review.js");

// reviews
// Post route
router.post("/", validateReview, isLoggedIn, WrapAsync(reviewController.review));
  
  //delete route
  router.delete("/:reviewId",isLoggedIn, isReviewAuthor , WrapAsync(reviewController.destroyReview));

  module.exports = router;