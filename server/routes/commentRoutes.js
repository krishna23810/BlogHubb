const express = require('express');

const router = express.Router();

const { createComment, getAllComments } = require('../controller/commentHandler');
const { isAuthenticated ,isUser} = require('../middleware/auth');

// Comment routes
router.post("/createcomments",isAuthenticated,isUser,createComment);
router.get("/getcomments",isAuthenticated, getAllComments);


module.exports = router;
