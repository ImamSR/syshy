var express = require('express');
var router = express.Router();

const userModel = require ("./users");
const postModel = require ("./posts");
const passport = require('passport');
const uploads = require("./multer");


const localStrategy  = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index', {error:req.flash('error')});
});

const fetchUserInitials = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user
    });

    const initialsData = await userModel.aggregate([
      {
        $match: {
          _id: user._id
        }
      },
      {
        $project: {
          initials: {
            $toUpper: {
              $substr: ["$username", 0, 2]
            }
          }
        }
      }
    ]);

    res.locals.userInitials = initialsData[0].initials;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat mengambil data pengguna.');
  }
};

router.get('/feed', isLoggedIn, fetchUserInitials, async function(req, res, next) {
  try {
    const allPosts = await postModel.find().populate("user");

    console.log(allPosts);

    res.render('feed', { posts: allPosts });

  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat mengambil data post.');
  }
});

router.get('/uploadpage',isLoggedIn,async function(req, res,next) {
res.render('uploadpage');
})



router.post('/uploads', isLoggedIn, uploads.single('file'), async function (req, res, next) {
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
      user: user._id
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



router.get('/profile', isLoggedIn, async function(req, res, next) {
  try {

    const user = await userModel.findOne({
      username: req.session.passport.user
    }).populate("posts");

    const initialsData = await userModel.aggregate([
      {
        $match: {
          _id: user._id
        }
      },
      {
        $project: {
          initials: {
            $toUpper: {
              $substr: ["$username", 0, 2]
            }
          }
        }
      }
    ]);
    const userInitials = initialsData[0].initials;
    console.log(user);
    res.render('profile', { user, userInitials });
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat mengambil data pengguna.');
  }
});


router.delete('/delete-post/:postId', isLoggedIn, async function(req, res) {
  const postId = req.params.postId;

  try {
        // Find the post by ID and delete it from the database
        const deletedPost = await postModel.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).send('Post not found.');
        }

        // Optionally, you may want to remove the post ID from the user's posts array
        const user = await userModel.findOne({ username: req.session.passport.user });
        const index = user.posts.indexOf(postId);
        if (index !== -1) {
            user.posts.splice(index, 1);
            await user.save();
        }
      // Respond with success
      res.status(200).send('Post deleted successfully.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Failed to delete post.');
  }
});






router.post('/register', function(req, res, ) {
  const { username, email}= req.body;
  const userData = new userModel ({username, email});

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local") (req, res, function(){
      res.redirect('/profile');
    })
  })
});

router.post('/index2', passport.authenticate("local", {
  successRedirect: '/feed',
  failureRedirect: '/',
  failureFlash:true
}),
function(req, res) {
});

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
if (req.isAuthenticated()) return next()
res.redirect('/');
};



module.exports = router;
