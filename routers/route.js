const productsRouter = require('./productsRouter');  // Import productsRouter
const userRouter = require('./userRouter');  // Import userRouter

// Export the router function to be used in the main app
module.exports = (app) => {
  // Use the routes defined in productsRouter
  app.use("/", productsRouter); 

  // Use the routes defined in userRouter
  app.use("/", userRouter); 
};
