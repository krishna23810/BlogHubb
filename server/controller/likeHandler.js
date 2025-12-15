const Like = require('../models/likes');
const Post = require('../models/post');
const User = require('../models/user');

exports.createLike = async (req, res) => {
    const { userID, postID, type } = req.body;

    try {
        console.log('Received:', { userID, postID, type });

        const userdata = await User.findById(userID);
        if (!userdata) {
            console.log('User not found');
            return res.status(404).json({
                success: false,
                message: `User with ID '${userID}' not found`,
            });
        }


        const postdata = await Post.findById(postID);

        if (!postdata) {
            console.log('Post not found');
            return res.status(404).json({
                success: false,
                message: `Post with ID '${postID}' not found`,
            });
        }
        //check if the like object already exists for this post
        const existingLike = await Like.findOne({ postId: postdata._id, 'user.user': userdata._id });

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: 'User has already liked/disliked this post',
            });
        }

        // if created insert like into likes collection
        const insertLike = await Like.findOneAndUpdate(
            { postId: postdata._id },
            { $push: { user: { user: userdata._id, type } } },
            { new: true, upsert: true }
        );
        let newLike = insertLike;
        if (!insertLike) {
            console.log('Creating like...');
             newLike = await Like.create({
                userId: userdata._id,
                postId: postdata._id,
                type,
            });
            
            console.log('Like created:', newLike);
        }
        console.log('Updating post with new like...');

        await Post.findByIdAndUpdate(
            postdata._id,
            { $push: { likes: newLike._id } },
            { new: true }
        );
        console.log('Post updated with new like');

        return res.status(201).json({
            success: true,
            data: newLike,
            message: `Post ${type}d successfully`,
        });
    } catch (error) {
        console.error('Error in createLike:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating like status for post',
            error: error.message,
        });
    }
};

exports.getAllLikes = async (req, res) => {
    try {
        const likes = await Like.find().populate('postId');
        return res.status(200).json({
            success: true,
            data: likes,
            message: 'All likes retrieved successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving likes',
            error: error.message,
        });
    }
};
