const jwt = require('jsonwebtoken');
const user = require('../models/user');

require('dotenv').config();

exports.isAuthenticated = async (req, res, next) => {

    try {
        // Extract token from cookies, body, or headers
        const token = (req.cookies && req.cookies.token)
            || (req.body && req.body.token)
            || (req.headers.Authorization && req.headers.Authorization.replace('Bearer ', ''));

        // Token not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please login to access this resource'
            });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token, please login again'
            });
        }

        // Check if user still exists in database
        const userdata = await user.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found, please login again'
            });
        }
        req.user = userdata;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token, please login again'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired, please login again'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

// admin or not 

exports.isAdmin = (req, res, next) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied, admin only resource'
            });
        }
        next();
    } catch (error) {
        console.error('Error in admin middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// user is user or not
exports.isUser = (req, res, next) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json({
                success: false,
                message: 'Access denied, user only resource'
            });
        }
        next();
    } catch (error) {
        console.error('Error in user middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};