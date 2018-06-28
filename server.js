  const express = require('express');
  const morgan = require('morgan');
  const mongoose = require('mongoose');
  const usermodels = require('./models/user');
  const connection = require('./connection');
  const config = require('./config');
  const User = require('./models/user');
  // const url = 'mongod1b://localhost:27017';


  const bodyParser = require('body-parser');
  const app = express();
  let port = process.env.PORT || 3000;


  mongoose.connect(config.keys.mongoUrl,(err)=>{
    if (err) console.error(err);
    else console.log('connected to mlab');
  })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}))


  app.use(morgan('dev'));

  app.post('/create-user',(req,res,next)=>{
    let user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save((err)=>{
      if (err) return next(err);
      else res.json('successfull created user')
    })
  })

  app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server is running on port', port);
  })
