const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  image : {
    type : String ,
    required : false
  },

  userID : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: false
  }],

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like',
    required: false
  }]
});

module.exports = mongoose.model("Post", postSchema);