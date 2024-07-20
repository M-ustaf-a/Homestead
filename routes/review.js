const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
  
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };
// reviews
// Post route
router.post("/", validateReview, WrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const review = new Review(req.body.review);
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  req.flash('success', 'Review added!');
  res.redirect(`/listings/${listing._id}`);
}));
  
  //delete route
  router.delete("/:reviewId", WrapAsync(async(req,res)=>{
   let {id, reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
   req.flash("success", "Review deleted!");
   res.redirect(`/listings/${id}`);
  })
  );

  module.exports = router;