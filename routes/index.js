const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./posts');
apiRouter.use('/products', productsRouter);


apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;

//  product_reviews;
//  reviews;
//  product_tags;
//  tags;
//  products;
//  users;
