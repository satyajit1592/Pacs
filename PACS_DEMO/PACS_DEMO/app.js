var express = require("express");
var app = express();
var path = require("path");

var cookie_parser = require("cookie-parser");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require('passport'),LocalStrategy = require('passport-local').Strategy;
var pgdbconnect=require('./routes/database/pgdbconnect');
var pgdbconnecthrm=require('./routes/database/pgdbconnect_hrm');
var moment = require('moment');
//set view engine
var bodyparser = require('body-parser');
app.set('view engine','ejs');

//Use these files
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({limit: '10mb',extended: false}));
 app.use(cookie_parser());

 app.use(express.static(path.join(__dirname,'public')));

  // session secret
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


 //app.use(passport.initialize());
 //app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



    app.use(function (req, res, next) {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.success=req.flash('success');
      res.locals.successrem=req.flash('successrem');
      res.locals.successpass=req.flash('successpass');
      res.locals.generationsuccess_msg=req.flash('generationsuccess_msg');
      next();
    });

    var loginroute = require("./routes/start");
    var loginModuleRoute=require("./routes/loginModule/login");
    var memberModuleRoute=require("./routes/memberDetailsModule/memberDetails");
    var bankModuleRoute=require("./routes/bankModule/bankDetails");



    app.use('/',loginroute);
    app.use('/loginModule/login',loginModuleRoute);
    app.use('/memberDetailsModule/memberDetails',memberModuleRoute);
    app.use('/bankModule/bankDetails',bankModuleRoute);


    //Listen to port 7000
    app.listen(9002,function(){
        console.log("Server Started @ 9002 :-)");
    });
