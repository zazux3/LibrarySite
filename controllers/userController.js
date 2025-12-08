const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Please fill all fields" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: role || "user" });

    res.status(201).json({
        message: "User registered",
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
});

// Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Please add email and password" });

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(200).json({ message: "Login successful", token });
    }

    res.status(401).json({ message: "Invalid email or password" });
});

// Profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role });
});

module.exports = { registerUser, loginUser, getUserProfile };
