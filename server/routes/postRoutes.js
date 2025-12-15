const express = require('express');

const router = express.Router();

const { createPost, getAllPosts, getPostById } = require('../controller/postHandler');
const { isAuthenticated ,isAdmin} = require('../middleware/auth');

// Post routes
router.post("/createpost", isAuthenticated,isAdmin,createPost);
router.get("/getposts",isAuthenticated , getAllPosts);
router.get("/getpostsbyID/:id",isAuthenticated, getPostById);

module.exports = router;
