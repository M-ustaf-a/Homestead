const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const WrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const MONG_URL = "mongodb://127.0.0.1:27017/PROJECT";

main().then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONG_URL);
}

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//index route
app.get("/listings", WrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//submit route
app.post("/listings", validateListing, WrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit", WrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//update route
app.put("/listings/:id", validateListing, WrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id", WrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

// reviews
// Post route
app.post("/listings/:id/reviews", validateReview, WrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  console.log(listing);
  const newReview = new Review(req.body.review);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
}));

//show route
app.get("/listings/:id", WrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 404, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
