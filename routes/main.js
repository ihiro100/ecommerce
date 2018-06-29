const router = require('express').Router();

router.get('/about',(req,res)=>{
  res.render('main/about')
})

router.get('/',(req,res)=>{
  res.render('main/home')
})

module.exports = router;
