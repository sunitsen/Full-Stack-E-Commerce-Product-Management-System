const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the Product Schema
const productSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true // Product name is mandatory
    },
    price: { 
      type: Number, 
      required: true // Price is mandatory
    },
    category: { 
      type: String, 
      required: true // Category is mandatory
    },
    stock: { 
      type: Number, 
      required: true // Stock quantity is mandatory
    },
    description: { 
      type: String // Optional field for additional product details
    },
    createdAt: { 
      type: Date, 
      default: Date.now // Automatically sets the creation timestamp
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Product model
module.exports.Products = model('Products', productSchema);
