const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser } = require("../db");

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
  
    next();
  });

// Register
usersRouter.post('/register', async (req, res, next)=>{
 
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

// Login
usersRouter.post('/login', async (req, res, next)=>{

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
      
      const token = jwt.sign({ id: 1, username: 'albert' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      res.send(token);
      
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

module.exports = usersRouter;