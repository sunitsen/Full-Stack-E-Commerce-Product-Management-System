const { Schema, model } = require("mongoose");
const { getHashPassword } = require("../lib/auth");

// Define the User Schema
const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, // Email is required
    unique: true, // Ensures unique emails
    trim: true // Removes unnecessary whitespace
  },
  password: { 
    type: String, 
    required: true // Password is required
  },
  role: { 
    type: String, 
    enum: ["admin", "user"], // Restricts role values to 'admin' or 'user'
    default: "user" // Default role is 'user'
  }
});

// Hash password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only if password is modified
  this.password = await getHashPassword(this.password);
  next();
});

// Export the User model
exports.User = model("User", userSchema);
