const productsRouter = require("express").Router();
const {
  getAllProductTags,
  getAllProducts,
  getProductById,
  deleteProduct
} = require("../db/products");
const {getAllReviews} = require("../db/reviews")
// const multer = require("multer");
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");


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
  console.log(reviews, "route reviews")
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
  console.log("A request was made to delete a product")
  const productId = req.params.productId;
  
  await deleteProduct(productId)
})

// productsRouter.get("/reviews", async (req, res, next) => {
//   console.log("Request was made to /products/reviews");

//   const productsReviews = await getAllProductReviews();
//   res.send({
//     productsReviews,
//   });
//   next();
// });

productsRouter.get("/tags", async (req, res, next) => {
  console.log("Request was made to /products/tags");

  const productsTags = await getAllProductTags();
  res.send({
    productsTags,
  });
  next();
});

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
//   });
//   const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "demo",
//   allowedFormats: ["jpg", "png"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }]
//   });
//   const parser = multer({ storage: storage });
// productsRouter.post('/api/images', parser.single("image"), (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });

module.exports = productsRouter;
