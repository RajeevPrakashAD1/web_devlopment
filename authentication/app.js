
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
   
const mongoose = require('mongoose');

const passport = require("passport");
// const passport_local = require("passport-local");

const passportLocalMongoose = require('passport-local-mongoose');


const session = require("express-session");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// var encrypt = require('mongoose-encryption');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.use(session({
    secret: 'i am ad',
    resave: false,
    saveUninitialized: false
    
  }));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect('mongodb://localhost/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    googleId:String,
    facebookId:String,
    secret:String

});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);






passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });


  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
      //console.log(profile);
    Users.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
      //console.log(profile);
    Users.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




Users = mongoose.model("user",UserSchema);

passport.use(Users.createStrategy());


// UserSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields: ['password'] });



// passport.serializeUser(Users.serializeUser());
// passport.deserializeUser(Users.deserializeUser());






app.get("/",function(req,res){
    res.render("home");

});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect secret.
    res.redirect('/secrets');
  });




app.get('/auth/facebook',
passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });


app.get("/login",function(req,res){
    res.render("login");

})

        //  ................................ bycrpt Method ......................................


// app.post("/login",function(req,res){
//     const email = req.body.username;
//     const password = req.body.password;
//     Users.findOne({email:email},function(err,founduser){
//         if(!err){
//             bcrypt.compare(password, founduser.password, function(err, result) {
//                 if(result==true){res.render("secrets");}
//                 else{res.send("wrong password");}
//             });
            
//         }
//         else{console.log(err);}
//     })
// })

app.get("/register",function(req,res){
    res.render("register");

});
// app.post("/register",function(req,res){
//     const password = req.body.password;
//     const email = req.body.username;

//     bcrypt.hash(password, saltRounds, function(err, hash) {
        
        
//         const user = Users({
//         email:email,
//         password:hash
//         })
//         user.save();
//         res.redirect("/login");
//     });
    

    

    
// })


// ........................................passport session method ..................................
app.get("/secrets",function(req,res){
    
    Users.find({secret:{$ne:null}},function(err,foundusers){
        if(!err){res.render("secrets",{foundusers:foundusers});}
        else{console.log(err);}
    });
});

app.post("/register",function(req,res){
    const password = req.body.password;
    const email = req.body.username;

    Users.register({username:email},password,function(err,user){
        if(err){
            console.log(err); res.redirect("/register");
        }
        else{

        

             passport.authenticate("local")(req,res,function() {
            
                res.redirect("/secrets");

                
                });

            
        }
    });
    

});


app.post("/login",function(req,res){
    const email = req.body.username;
    const password = req.body.password;
    user = new Users({
        username:email,
        password:password
    })
    req.login(user, function(err) {
        if (err) { 
            console.log(err); 
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            });
             
        }
    });
});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get("/submit",function(req, res){
    if(req.isAuthenticated()){
        res.render("submit");}
    else{
        res.redirect("/login");
    }
});

app.post("/submit",function(req, res){

    const submittedSecret = req.body.secret;

    console.log(req.user.id);
    Users.findById(req.user.id,function(err,founduser){
        if(!err){founduser.secret = submittedSecret; founduser.save();res.redirect("/secrets");}
        else{console.log(err);}
    })

});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});
	