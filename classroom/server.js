const express = require("express");
const app = express();
const session = require("express-session");
const review = require( "../models/review" );
const path = require("path");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(session({secret: "mysupersecretstring", resave: false, saveUninitialized: true}));
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.succsMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name = "Anonymous"} = req.query;
    req.session.name = name;
    // req.flash("success", "user registered successfully!")
    if(name==="Anonymous"){
        req.flash("error", "user not register");
    }else{
        req.flash("success", "user registered successfully!")
    }
    res.redirect("/hello");
})

app.get("/hello", (req,res)=>{
    res.render("page.ejs", {name: req.session.name});
});

// app.get("/reqcount", (req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// })
// app.get("/test", (req,res)=>{
//     res.send("Test successfull!");
// })

app.listen(8080, ()=>{
    console.log("Server Listening");
})