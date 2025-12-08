const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const authorizeRoles = require('../middleware/authorizeRoles');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateTokenHandler, getUserProfile);

// demo-only staff route
router.get('/staff/secret', validateTokenHandler, authorizeRoles('staff'), (req, res) => {
    res.json({ message: "Welcome, staff" });
});

module.exports = router;
