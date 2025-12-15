const express = require('express');

const router = express.Router();

const { createLike, getAllLikes } = require('../controller/likeHandler');
const { isAuthenticated ,isUser} = require('../middleware/auth');

// Like routes
router.post("/createlikes",isAuthenticated,isUser, createLike);
router.get("/getAllLikes",isAuthenticated, getAllLikes);


module.exports = router;
