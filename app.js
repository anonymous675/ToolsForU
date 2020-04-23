require('dotenv').config()
const express = require('express')
    // , mongo = require('mongodb')
    // , mongoose = require('mongoose')
    , app = express()
    , pug = require('pug')
    , path = require("path")
    , bodyParser = require('body-parser')
    , fs = require('fs')
    , flash = require('connect-flash')
    , session = require('express-session')
    , config = require('./config/database')
    , cookieParser = require('cookie-parser')
    , nodemailer = require('nodemailer')
    , helmet = require('helmet')
    , PORT = process.env.PORT;

app.use(express.static(__dirname));

// // Mongo DB
// mongoose.connect(config.database, {useNewUrlParser:true, useUnifiedTopology: true}, (err) =>{
//   if (err) console.log(err);
// });
// let db = mongoose.connection;
//
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// // Check connection
// db.once('open', () => {
//   console.log('connected to mongoDB and mongoose');
// });
//
// // Check for DB errors
// db.on('error', (error) => console.log(error));

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge:2592000000
}));
// security
app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(session({
  secret: 'asdasfsdggesd',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180 * 60 * 1000 }
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*', (req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get('(/|/home)', (req, res) => {
    res.render('home');
});

let dev = require('./routes/dev');
app.use('/tools/dev', dev);

app.listen(PORT, () => console.log('app listening on port 3000!'));
