const productsRouter = require("express").Router();
const {
  getAllProductTags,
  getAllProducts,
  getProductById,
  deleteProduct
} = require("../db/products");
const {getAllReviews} = require("../db/reviews")


productsRouter.get("/", async (req, res, next) => {
  console.log("Use Request was made to /products");
  try {
    const products = await getAllProducts();
  res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/reviews", async (req, res, next) => {
  console.log("A request was made to products/reviews")
  try {
    const reviews = await getAllReviews();
  // console.log(reviews, "route reviews")
  res.send(reviews)
  } catch (error) {
    next(error)
  }
})

productsRouter.get("/:productId", async (req, res, next) => {
  console.log("A request is being made to /:productId");
  try {

    const productId = req.params.productId;
  
    const product = await getProductById(productId);
  
    res.send(product);
  } catch (error) {
    next(error)
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
      console.log("A request was made to delete a product")
      const productId = req.params.productId;
      await deleteProduct(productId)
  } catch (error) {
    next(error)
  }
    await deleteProduct(productId)
})



module.exports = productsRouter;
