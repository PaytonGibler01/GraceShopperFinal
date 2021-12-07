const usersRouter = require('express').Router();
const { getAllUsers, getUserByUsername,createUser } = require('../db/users') 
const {getAllItemsByCartId , createCart_Item } = require('../db/cart')
const jwt = require("jsonwebtoken");
const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = require('react-dom');
const { JWT_SECRET="neverTell" } = process.env
usersRouter.use("/", (req, res, next) => {
    console.log("Request was made to /users")
    // res.send({
    //     message: "Users is under construction"
    // });
    next()
  });


//users
  usersRouter.get("/", async (req, res, next) => {
    console.log("Request was made to /users")
    const users = await getAllUsers()
  res.send({
     users
  });
  next()
});

usersRouter.get("/admin", async (req, res, next) => {
  
  try {
    
  } catch (error) {
    
  }
});

//api/users/cart
usersRouter.get("/cart", async (req, res, next) => {
  console.log("Get Request was made to /cart")
  // const { cartId } = req.body;
    const cart = await getAllItemsByCartId(req)
  res.send(
    cart
  );
  next()
});
usersRouter.get("/cart/add", async (req, res, next) => {
  console.log("Get Request was made to /cart/add")
  const { productId, cartId } = req.body;
    const cart = await createCart_Item({ productId, cartId })
  res.send(
    cart
  );
  next()
});


//api/users/login
usersRouter.post('/login', async (req, res, next)=>{
    console.log("Request was made to /login")
    const { username, password } = req.body;
        
    if (!username || !password) {
        next({
          name: "MissingCredentialsError",
          message: "Please supply both a username and password"
        });
      }
    
      try {
        const user = await getUserByUsername(username);
    
        if (user && user.password == password) {
          
          const token = jwt.sign(
            { id: user.id, username: user.username }, JWT_SECRET, 
            {
              expiresIn: "1h",
            }
          );
          console.log("this is token",token)
          res.send({user, token, message: "you are logged in!"});
        } /*else if (user && user.password == password && isAdmin) {
          const token = jwt.sign(
            { id: user.id, username: user.username }, JWT_SECRET, 
            {
              expiresIn: "1h",
            }
          );
          console.log("this is token",token)
          res.send({user, token, message: "Welcome back, Administrator!"});
        } */ else {
          next({ 
            name: 'IncorrectCredentialsError', 
            message: 'Your username or password is incorrect'
          });
        }
      } catch(error) {
        console.log(error);
        next(error);
      }
    });

  

//api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { username, password, userEmail, isAdmin,isSeller } = req.body;
  console.log(username, password, userEmail,isAdmin,isSeller,"req.body")
  try {
    const queriedUser = await getUserByUsername(username);
console.log(queriedUser,"queriedUser")
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
      console.log(user,"user")
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
        console.log(token,"Token")
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