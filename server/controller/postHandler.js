const { response } = require('express');
const Post = require('../models/post');
const { uploadImage } = require('../imageUploder');

exports.createPost = async (request, response) => {
    try {
        const { title, content, userID } = request.body;
        const file = request.files ? request.files.image : null;
        console.log('file', file);
        const imageUrl = await uploadImage(file, process.env.IMAGE_FOLDER);
        console.log('imageUrl', imageUrl.secure_url);
        const newPost = await Post.create({ title, content, image: imageUrl.secure_url, userID });
        console.log('newPost', newPost);
        response.status(201).json({
            success: true,
            data: newPost,
            message: 'Post created successfully'
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message
        });
    }
}

exports.getAllPosts = async (request, response) => {
    try {
        const posts = await Post.find();
        response.status(200).json({
            success: true,
            data: posts,
            message: "All posts retrieved successfully"
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error retrieving posts',
            error: error.message
        });
    }
}

exports.getPostById = async (request, response) => {
    try {
        // populate comments
        const post = await Post.findById(request.params.id).populate({
            path: 'comments',
            populate: {
                path: 'userID',
                select: 'username email'
            }
                
        }).populate('likes').populate("userID").exec();



        if (!post) {
            return response.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        // remove sensitive info
        if (post.userID) {
            post.userID.password = undefined;
        }
        response.status(200).json({
            success: true,
            data: post,
            message: "Post retrieved successfully"
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error retrieving post',
            error: error.message
        });
    }
}
