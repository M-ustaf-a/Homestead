const User = require("../models/user");

module.exports.userSignup = (req,res)=>{
    res.render("./users/signup.ejs")
}

module.exports.registerUser = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to homestead");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.loginUser = async(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.logoutUser =  async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            req.flash("error",err.message);
            next(err);
        }
        req.flash("success", "Logout");
        res.redirect("/login");
    })
}

module.exports.saveUrl =  async(req,res)=>{
    req.flash("success", "welcome back to homestead");
    let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
}