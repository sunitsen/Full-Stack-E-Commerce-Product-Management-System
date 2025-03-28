const express = require("express");
const {
  getAllProducts,
  saveProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController"); // Import product controllers

const { authentication } = require("../middleware/authentication");

const productsRouter = express.Router();

// Routes for fetching all products and adding a new product
productsRouter
  .route("/products")
  .get(getAllProducts) // Public route: Fetch all products
  // Protected route: Add a product
  productsRouter
  .route("/products")
  .post(authentication, saveProduct)

// Routes for handling a specific product by ID
productsRouter
  .route("/user/products/:id")
  .get(getProductById) // Public route: Get a single product by ID
  .put(authentication, updateProduct) // Protected route: Update a product
  .delete(authentication, deleteProduct); // Protected route: Delete a product

module.exports = productsRouter;
