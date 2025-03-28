const mongoose = require('mongoose');
const { Products } = require('../model/products'); // Correct import of Products model

// Get all products with sorting, pagination, and filtering
const getAllProducts = async (req, res) => {
  const { 
    criteria = "price", 
    order = "asc", 
    page = 1, 
    limit = 3, 
    category, 
    minPrice, 
    maxPrice 
  } = req.query;

  const skip = (page - 1) * limit;

  // Build the filter object for category and price range
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  try {
    // Fetch products based on filters, sorting, and pagination
    const products = await Products.find(filter)
      .sort({ [criteria]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message || "Error getting products" });
  }
};

// Save a new product to the database
const saveProduct = async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;

    // Create a new product in the database
    const result = await Products.create({ name, price, category, stock, description });

    res.status(201).json({
      message: "Product created successfully",
      product: result
    });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ message: "Error saving product" });
  }
};

// Get a product by its ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Products.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving product" });
  }
};

// Update a product by its ID
const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "Invalid product ID format" });
    }


    // Update the product and return the updated version
    const updatedProduct = await Products.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error updating product" });
  }
};

// Delete a product by its ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  console.log("Product ID:", productId);

  // Validate the provided product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    // Find and delete the product
    const product = await Products.findByIdAndDelete(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  getAllProducts,
  saveProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
