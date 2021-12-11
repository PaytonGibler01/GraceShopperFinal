const apiRouter = require('express').Router();


apiRouter.get("/", (req, res, next) => {
  console.log("Request was made to /")
  res.send({
    message: "API is under construction!"
  });
  next()
});


const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);


const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);


apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
