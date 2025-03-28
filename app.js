const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

// Define the port
const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json()); 

// MongoDB connection function
const connect = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    // If connection fails, log the error and exit the process
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Connect to MongoDB
connect();

// Import and use routes from the routers directory
require('./routers/route')(app);

// Middleware for handling 404 - Route not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  // Send a response with the error message or a generic error message
  if (err.message) {
    res.status(500).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
