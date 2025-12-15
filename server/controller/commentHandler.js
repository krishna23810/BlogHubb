const Comment = require('../models/comments');
const Post = require('../models/post');
const User = require('../models/user');


exports.createComment = async (req, res) => {
  try {
    console.log('Raw body:', req.body);

    // guard against undefined body
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is missing',
      });
    }

    const { userID, postID, text } = req.body;

    // validate required fields
    if (!userID || !postID || !text) {
      return res.status(400).json({
        success: false,
        message: 'userID, postID, and text are required',
      });
    }

    // find user by _id
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID '${userID}' not found`,
      });
    }

    // find post by _id
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with ID '${postID}' not found`,
      });
    }

    // create comment
    const newComment = await Comment.create({
      text,
      userID: user._id,
      postID: post._id,
    });

    // attach comment to post
    await Post.findByIdAndUpdate(
      post._id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: newComment,
      message: 'Comment created successfully and post updated',
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message,
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json({
      success: true,
      data: comments,
      message: 'All comments retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving comments',
      error: error.message,
    });
  }
};
