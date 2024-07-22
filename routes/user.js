const express = require("express");
const User = require( "../models/user" );
const WrapAsync = require( "../utils/WrapAsync" );
const passport = require( "passport" );
const { saveRedirectUrl } = require( "../middleware" );
const router = express.Router();


//signup routes
router.get("/signup", (req,res)=>{
    res.render("./users/signup.ejs")
});

router.post("/signup", WrapAsync(async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.flash("success", "Welcome to homestead");
        res.redirect("/listings");
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}))

//login routes
router.get("/login", async(req,res)=>{
    res.render("./users/login.ejs");
})

//logout routes
router.get("/logout", (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            req.flash("error",err.message);
            next(err);
        }
        req.flash("success", "Logout");
        res.redirect("/login");
    })
})

router.post("/login",saveRedirectUrl,passport.authenticate("local", {failureRedirect:"/login", failureFlash: true}), async(req,res)=>{
    req.flash("success", "welcome back to homestead");
    let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
})

module.exports = router;