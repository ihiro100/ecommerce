const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user,done)=>{
  done(null,user._id)
})


passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user)
  })
})

passport.use('local-login',new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function(req,email,password,done){
  User.findOne({email:email},function(err,user){
    if (err) return done(err);
    if(!user) return done(null,false,req.flash('loginMessage','no user has been found'))
    if (!user.comparePassword(password)) {
      return done(null,false,req.flash('loginMessage','wrong password'));
    }

    return done(null,user);
  })
}))


exports.isAuthenticated = function (req,res,next) {
  // body...
  if( req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
};
