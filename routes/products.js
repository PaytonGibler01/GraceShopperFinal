const productsRouter = require('express').Router();
const { getAllProducts, getAllProductReviews, getAllProductTags } = require('../db/products')

productsRouter.use("/", async (req, res, next) => {
    console.log("Request was made to /products")
    res.send({
        message: "Products is under construction"
    });
    console.log("A request is being made to /posts");
    next()
  });



productsRouter.get("/", async (req, res, next) => {
    console.log("Get Request was made to /products")
    const products = await getAllProducts()
  res.send({
     products
  });
  next()
});


productsRouter.get("/reviews", async (req, res, next) => {
    console.log("Request was made to /products/reviews")

    const productsReviews = await getAllProductReviews()
  res.send({
     productsReviews
  });
  next()
});

productsRouter.get("/tags", async (req, res, next) => {
    console.log("Request was made to /products/tags")

    const productsTags = await getAllProductTags()
  res.send({
     productsTags
  });
  next()
});


module.exports = productsRouter;