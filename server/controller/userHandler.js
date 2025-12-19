const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (request, response) => {
    try {
        const { username, email, password, role } = request.body;
        console.log(request.body);

        if(!username||! email ||! password ||!role){
            return response.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const userCheck = await user.findOne({ email });
        if (userCheck) {
           return response.status(400).json({
                success: false,
                message: 'User already exists with this email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({ username, email, password:hashedPassword, role });
        response.status(201).json({
            success: true,
            data: newUser,
            message: 'User created successfully'
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
}

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        // Check if the email is valid
        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        // Check if the user exists
        const userdata = await user.findOne({ email });
        if (!userdata) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Check if the password is correct
        const checkPassword = await bcrypt.compare(password, userdata.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        //palyload for JWT
        const palyload = {
            email: userdata.email,
            id: userdata._id,
            role: userdata.role,
        }
        // Generate JWT token
        let token = jwt.sign(palyload, process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        userdata.token = token; // Add token to the user object

        await userdata.save();

        userdata.password = undefined; // Remove password from the user object
        // Set the token in a cookie
        const NODE_ENV = process.env.NODE_ENV || 'development';
        res.cookie('token', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            userdata,
            token
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}



exports.getAllUsers = async (request, response) => {
    try {
        const users = await user.find();
        response.status(200).json({
            success: true,
            data: users,
            message: "All users retrieved successfully"
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
}
