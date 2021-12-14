const usersRouter = require('express').Router();
const { getAllUsers, getUserByUsername,createUser } = require('../db/users') 
const { getAllProducts } = require('../db/products')
const {createCart, getAllItemsByCartId , createCart_Item,getCartItems, getCartByUserId, removeItemFromCart } = require('../db/cart')
const {requireUser} = require("../src/api/utils")
const jwt = require("jsonwebtoken");
const { getCart } = require('../db/cart');
const { JWT_SECRET="neverTell" } = process.env
usersRouter.use("/", (req, res, next) => {
    console.log("Request was made to /users")
    next()
  });


//users
  usersRouter.get("/", async (req, res, next) => {
    console.log("Request was made to /users")
    try {
      const users = await getAllUsers()
  res.send(
     users
  );
    } catch (error) {
      next(error) 
    }
  })

//api/users/cart
usersRouter.get("/cart", async (req, res, next) => {
  console.log("Get Request was made to /cart")

  try {
  const cart = await getCart()
  if (cart){
    const cartItems = await getCartItems()

    res.send(
   cartItems
    );
  }
    if(!cart){
    res.status(401)
    next({
      name: 'No Cart Items',
      message: 'No Cart Items'
  });
  }
  } catch (error) {
    next(error)
  }
});

usersRouter.post("/cart/add", async (req, res, next) => {
  try {
    console.log("Get Request was made to /cart/add")
  const { productId, cartId } = req.body;
    const cart = await createCart_Item({ productId, cartId })
  res.send(
    cart
  );
  } catch (error) {
    next(error)
  }
  
});

usersRouter.delete("/cart/:productId", async (req, res, next) => {
  try {
    console.log("Get Request was made to /cart/delete")
  const productId = req.params.productId;
    await removeItemFromCart( productId )
  } catch (error) {
    next(error)
  }
  
});


//api/users/me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});



//api/users/login
usersRouter.post('/login', async (req, res, next)=>{
    console.log("Request was made to /login")
    const { username, password } = req.body;
      let cart
    if (!username || !password) {
        next({
          name: "MissingCredentialsError",
          message: "Please supply both a username and password"
        });
      }
    
      try {
        const user = await getUserByUsername(username);
        const checkCart = await getCartByUserId(user.id)
        if(checkCart=== undefined){
        let cart = await createCart(user.id);
        } else {
          let cart = checkCart
        }
        if (user && user.password == password) {
          
          const token = jwt.sign(
            { id: user.id, username: user.username }, JWT_SECRET, 
            {
              expiresIn: "1h",
            }
          );
          res.send({user, token, cart, message: "you are logged in!"});
        
      }} catch (error) {
        console.error(error);
        next(error);
      }
    });

  

//api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { username, password, userEmail, isAdmin,isSeller } = req.body;
  try {
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401)
      
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else if (password.length<8){
      res.status(401)

      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!'
      })
    } else {
      const user = await createUser({
        username,
        password,
        userEmail,
        isAdmin,
        isSeller
      })
      if(!user){
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.'
        })
      } else {
        const token = jwt.sign({ 
          id: user.id, 
          username: user.username
        }, JWT_SECRET, {
          expiresIn: '1w'
        });
        res.send({ 
          user,
          message: "you're signed up!",
          token 
        });
      }
    }
  } catch (error) {
    next (error)
  } 
});




module.exports = usersRouter;