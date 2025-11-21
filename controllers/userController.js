const asyncHandler = require('express-async-handler');

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Register the user' });
});

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login the user' });
});

// @desc User profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ message: 'Get user profile' });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
