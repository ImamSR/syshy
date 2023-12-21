const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

// Replace the following connection string with your MongoDB Atlas connection string
const atlasConnectionStr = 'mongodb+srv://imamsayyid332:L20GSCGT61r1XKM6@cluster0.hxzkret.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlasConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);