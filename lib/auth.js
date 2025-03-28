const bcrypt = require("bcryptjs");

// Function to hash a password
exports.getHashPassword = async (password) => {
    // Generate a salt with 10 rounds
    const salt = bcrypt.genSaltSync(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
};

// Function to compare a plain text password with a hashed password
exports.comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};
