const productsRouter = require("express").Router();
const {
  getAllProductReviews,
  getAllProductTags,
  getAllProducts,
  getProductById,
} = require("../db/products");

// productsRouter.use("/", async (req, res, next) => {
//   console.log("Request was made to /products");
//   // res.send({
//   //     message: "Products is under construction"
//   // });
//   next();
// });

productsRouter.get("/", async (req, res, next) => {
  console.log("Use Request was made to /products");
  const products = await getAllProducts();
  res.send(products);
  next();
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    console.log("A request is being made to /:productId");

    const productId = req.params.productId;
  
    console.log(productId, "Route Log");
  
    const product = await getProductById(productId);
  
    console.log(product, "Single Product Route Check");
  
    res.send(product);
  } catch (error) {
    next(error)
  }
});

productsRouter.get("/reviews", async (req, res, next) => {
  console.log("Request was made to /products/reviews");

  const productsReviews = await getAllProductReviews();
  res.send({
    productsReviews,
  });
  next();
});

productsRouter.get("/tags", async (req, res, next) => {
  console.log("Request was made to /products/tags");

  const productsTags = await getAllProductTags();
  res.send({
    productsTags,
  });
  next();
});

module.exports = productsRouter;
