const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role
        };
        next();
    });
});

module.exports = validateTokenHandler;
