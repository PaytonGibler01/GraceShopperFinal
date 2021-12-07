import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser } from "../api/users";
import { useHistory } from "react-router-dom";
import {storeToken, storeUser}  from "../auth"
import "./RegLog.css"
import { user } from "pg/lib/defaults";

const Login = ({ setIsLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  return (
    <>
      <Form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();
          
          try {
            const token = await loginUser(userName, password);
            setIsLoggedIn(true);
            setUserName("");
            setPassword("");
            history.push("/home")

            if (user.isAdmin == true) {
              setIsAdmin(true)
            }
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