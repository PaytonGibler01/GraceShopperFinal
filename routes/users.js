const usersRouter = require('express').Router();
const { getAllUsers, getUserByUsername } = require('../db') //MAKE THESE FUNCTIONS
const jwt = require("jsonwebtoken");

usersRouter.use("/users", (req, res, next) => {
    res.send({
        message: "Users is under construction"
    });
    console.log("A request is being made to /posts");
    next()
  });


  usersRouter.get("/users", async (req, res, next) => {
    const users = await getAllUsers()
  res.send({
     users
  });
});

usersRouter.post("/users/login", async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body, " this is the req.body !!!!!!!!")

        if(!username || !password){
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password", 
            })}

        try {
            const user = await getUserByUsername(username)
            if (user && user.password == password) {

                const token = jwt.sign(
                  { id: 1, username: "albert" }, 
                  {expiresIn: "1h",}
                  
                );
                res.send({ message: "you're logged in!", "token": token });
              } else {
                next({
                  name: "IncorrectCredentialsError",
                  message: "Username or password is incorrect",
                });
              }
        } catch (error) {
            console.log(error)
            next(error)
        }
});




module.exports = usersRouter;