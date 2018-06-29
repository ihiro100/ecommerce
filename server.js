  const express = require('express');
  const morgan = require('morgan');
  const mongoose = require('mongoose');
  const usermodels = require('./models/user');
  const connection = require('./connection');
  const config = require('./config');
  const User = require('./models/user');
  const ejs = require('ejs');
  const engine = require('ejs-mate');
  const session = require('express-session');
  const cookieParser = require('cookie-parser');
  const flash = require('express-flash');
  const mongoStore = require('connect-mongo')(session);
  const passport  = require('passport')

  const mainRoutes = require('./routes/main');
  const userRoutes = require('./routes/user');
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
  app.use(cookieParser());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.keys.secret,
    store: new mongoStore({url: config.keys.mongoUrl, autoReconnect: true})
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session())



  app.use(function(req, res, callback){
    res.locals.user = req.user;
    callback()
  })



  app.engine('ejs',engine)
  app.set('view engine','ejs')
  app.use(express.static(__dirname+ '/public'))
  app.use(morgan('dev'));



  app.use('/',mainRoutes)
  app.use('/',userRoutes)



  app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server is running on port', port);
  })
