const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const passportConfig = require('../config/passport');

router.get('/signup',(req,res,next)=>{
  res.render('accounts/signup',{
    errors: req.flash('errors')
  })
})

router.get('/login',(req,res)=>{
  if(req.user) return res.redirect('/');
  res.render('accounts/login',{message: req.flash('loginMessage')})
})

router.get('/profile',(req,res,next)=>{
  User.findOne({_id: req.user._id},(err,user)=>{
    if (err) return next(err);
    res.render('accounts/profile',{user: user})
  })
})


router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))


router.post('/signup',(req,res,next)=>{
  let user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.profile.picture = user.gravatar();
  console.log(user);

  // console.log(req.body);
  User.findOne({email: req.body.email},function(err,existingUser){
    if (existingUser){
      req.flash('errors','Account with that email address already exits')
      return res.redirect('/signup')
    }
    else {
      user.save(function(err,user) {
        if (err) return  next(err);

        req.logIn(user,(err)=>{
          if (err) next(err);
          res.redirect('/profile')
        })

        // res.redirect('/login')

      })
    }
  })
})

router.get('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/');
})

router.get('/edit-profile',(req,res,next)=>{
  res.render('accounts/edit-profile',{message: req.flash('success')})
})

router.post('/edit-profile',(req,res,next)=>{
  User.findOne({_id: req.user._id},(err,user)=>{
    if(err) return next(err);

    if(req.body.name) user.profile.name = req.body.name;
    if(req.body.address) user.address = req.body.address;

    user.save((err)=>{
      if (err) next(err);
      req.flash('success','Successfully edited your profile')
      return res.redirect('/edit-profile');
    })
  })
})


module.exports = router;
