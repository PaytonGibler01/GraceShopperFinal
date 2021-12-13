import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser, createUserCart } from "../api/users";
import { useHistory } from "react-router-dom";
import {
  storeToken, getToken,
  storeUser, getUser
}  from "../auth"
import "./RegLog.css"


const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const currentUser = getUser();


  return (
    <>
      <Form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();
          
          try {
            const loggedInUser = await loginUser(userName, password);
            storeToken(loggedInUser.token);
            setIsLoggedIn(true);
            storeUser(loggedInUser.user);
            

            setUserName("");
            setPassword("");
            if (loggedInUser.user.isAdmin == true) {
              setIsAdmin(true)
            }


            history.push("/home")
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me Logged in" />
        </Form.Group>

        <Button variant="primary" type="submit" className="button">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;