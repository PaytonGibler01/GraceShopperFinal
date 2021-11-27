const usersRouter = require('express').Router();
const { getAllUsers, getUserByUsername,createUser } = require('../db/users') //MAKE THESE FUNCTIONS
const jwt = require("jsonwebtoken");

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
        } else {
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
usersRouter.post('/register', async (req, res, next)=>{
    console.log("Request was made to /register")
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);
    
        if (_user) {
          next({
            name: 'UserExistsError',
            message: 'That username has already been taken'
          });
        }
    
        const user = await createUser({
          username,
          password
        });
        
        // Password Requirements
        if (user.password.length < 8){
            next({
                name: 'PasswordExistsError',
                message: 'Password is too short, must be at least 8 characters'
              });
        }

        const token = jwt.sign({ 
          id: user.id, 
          username
        }, process.env.JWT_SECRET, {
          expiresIn: '1w'
        });
    
        res.send({ 
          message: "Thank you for signing up",
          token 
        });
      }

    catch ({ name, message }) {
        next({ name, message })
      } 
});




module.exports = usersRouter;