const { verify } = require('jsonwebtoken');
require('dotenv').config();

// Middleware for authentication
module.exports.authentication = async (req, res, next) => {
    // Get the token from the Authorization header
    const authentication = req.header("Authorization");
    
    if (!authentication) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract the token from the header (Bearer <token>)
    const token = authentication?.split(" ")?.[1];
    console.log("THIS IS TOKEN:", token);

    try {
        // Verify the token using the secret key
        verify(token, process.env.SECRET_KEY);
        console.log("TOKEN IS VALID");
        
        // Move to the next middleware or route handler
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
};
