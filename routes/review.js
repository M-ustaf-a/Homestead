const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require( "../middleware.js" );
const {validateReview} = require("../middleware.js")
  

// reviews
// Post route
router.post("/", validateReview, isLoggedIn, WrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  console.log(review);
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  req.flash('success', 'Review added!');
  res.redirect(`/listings/${listing._id}`);
}));
  
  //delete route
  router.delete("/:reviewId",isLoggedIn, isReviewAuthor , WrapAsync(async(req,res)=>{
   let {id, reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
   req.flash("success", "Review deleted!");
   res.redirect(`/listings/${id}`);
  })
  );

  module.exports = router;