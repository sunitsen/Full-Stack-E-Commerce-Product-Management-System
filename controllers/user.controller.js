const { User } = require('../model/user');
const { comparePassword } = require('../lib/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        let result = await User.findOne({ email });
        if (result) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create and save the new user
        result = new User({ email, password });
        await result.save();

        return res.status(201).json({ message: "User registered successfully", result });

    } catch (err) {
        console.error("Error registering user:", err.message);
        res.status(500).json({ message: "Error registering user" });
    }
};

// Login user and generate a JWT token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Validate the password
        const isPassValid = await comparePassword(password, result.password);
        if (!isPassValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token with expiration
        const token = jwt.sign(
            { email: result.email, role: result.role },
            process.env.SECRET_KEY,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        console.log("JWT Token:", token);
        res.status(200).json({ message: "User logged in successfully", token });

    } catch (err) {
        console.error("Error logging in user:", err.message);
        res.status(500).json({ message: "Error logging in user" });
    }
};
