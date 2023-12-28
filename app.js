var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const { MongoClient } = require('mongodb'); // Import MongoClient
const { v4: uuidv4 } = require('uuid'); // Import uuidv4
const userModel = require('./routes/users');
const postModel = require('./routes/posts');
const app = express();
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hohoho',
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// test
const uri = 'mongodb+srv://imamsayyid332:L20GSCGT61r1XKM6@cluster0.hxzkret.mongodb.net/cluster0?retryWrites=true&w=majority';
const dbName = 'cluster0';

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Initialize connection to MongoDB Atlas
const clientPromise = connectToMongoDB();

// Create storage engine using GridFS
const storage = new GridFsStorage({
  url: uri,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const uniquename = uuidv4();
    return {
      bucketName: 'uploads',
      filename: uniquename + path.extname(file.originalname),
    };
  },
});

const uploads = multer({ storage });

// Handle file uploads and create posts
app.post('/uploads', isLoggedIn, uploads.single('file'), async function (req, res, next) {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      req.flash('error', 'No files were uploaded');
      return res.redirect('/profile');
    }

    // Retrieve the user based on the session
    const user = await userModel.findOne({ username: req.session.passport.user });

    // Create a new post using postModel
    const post = await postModel.create({
      image: req.file.filename,
      imageText: req.body.pe,
      user: user._id,
    });

    // Update the user's posts array
    user.posts.push(post._id);
    await user.save();

    // Redirect to the user's profile page
    req.flash('success_msg', 'File uploaded and post created successfully');
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to upload file and create post');
    res.redirect('/profile');
  }
});

module.exports = { uploads, clientPromise };
module.exports = app;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}
