const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateTokenHandler, getUserProfile);  

module.exports = router;
