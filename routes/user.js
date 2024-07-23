const express = require("express");
const User = require( "../models/user" );
const WrapAsync = require( "../utils/WrapAsync" );
const passport = require( "passport" );
const { saveRedirectUrl } = require( "../middleware" );
const router = express.Router();
const userController = require("../controllers/user");


//login routes
router.route("/login")
.get(userController.loginUser)
.post(saveRedirectUrl,passport.authenticate("local", {failureRedirect:"/login", failureFlash: true}), userController.saveUrl)

//signup routes
router.route("/signup")
.post(WrapAsync(userController.registerUser))
.get(userController.userSignup)

//logout routes
router.get("/logout", userController.logoutUser);

module.exports = router;