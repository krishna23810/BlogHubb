// Import user model
const User = require('./user'); 
const Post = require('./post');
const mongoose = require('mongoose');

async function checkUserExists(userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return null;
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return null;
    }
}

async function checkPostExist(postId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) return null;
        const post = await Post.findById(postId);
        return post;
    } catch (error) {
        console.error('Error checking post existence:', error);
        return null;
    }
}

module.exports = { checkUserExists, checkPostExist };