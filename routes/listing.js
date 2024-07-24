const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validateListing} = require( "../middleware.js" );
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});


router.route("/")
.get(WrapAsync(listingControllers.index))
.post( isLoggedIn,upload.single("listing[image]"),WrapAsync(listingControllers.createListing))



//new route
router.get("/new",isLoggedIn, listingControllers.renderNewForm);


//edit route
router.get(
  "/:id/edit",isLoggedIn, isOwner,
  WrapAsync(listingControllers.editListing),
);

router.route("/:id")
.get(WrapAsync(listingControllers.showListing))
.delete(isLoggedIn,isOwner,WrapAsync(listingControllers.destroyListing))
.put( isLoggedIn, isOwner,upload.single("listing[image]"),validateListing,WrapAsync(listingControllers.updateListing))


module.exports = router;
