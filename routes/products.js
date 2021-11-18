const productsRouter = require('express').Router();
const { getAllProducts, getAllProductReviews, getAllProductTags } = require ('../db')

productsRouter.use("/products", (req, res, next) => {
    res.send({
        message: "Products is under construction"
    });
    console.log("A request is being made to /posts");
    next()
  });


productsRouter.get("/products", (req, res, next) => {
    const products = await getAllProducts()
  res.send({
     products
  });
});

productsRouter.get("/products/reviews", (req, res, next) => {
    const productsReviews = await getAllProductReviews()
  res.send({
     productsReviews
  });
});
productsRouter.get("/products/tags", (req, res, next) => {
    const productsTags = await getAllProductTags()
  res.send({
     productsTags
  });
});
//  product_reviews;
//  reviews;
//  product_tags;
//  tags;
//  products;
//  users;

module.exports = productsRouter;