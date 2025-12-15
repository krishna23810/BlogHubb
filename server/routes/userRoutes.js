const express = require('express');

const router = express.Router();

const { createUser,login, getAllUsers } = require('../controller/userHandler');
const { isAuthenticated } = require('../middleware/auth');

// User routes
router.post("/signup", createUser);
router.post("/login", login);
router.get("/allusers", isAuthenticated, getAllUsers);


module.exports = router;
