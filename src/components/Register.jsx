import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {registerUser} from "../api/users";
import {storeToken} from "../auth";
import { useHistory } from "react-router-dom";
import "./RegLog.css"

const  Register = ({ setIsLoggedIn,setCurrentUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory()
  return (
    <Form
      id="register"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
           const { token } = await registerUser(userName, password, email);
          console.log(token, userName)
          storeToken(token);
          setIsLoggedIn(true);
          setUserName("");
          setPassword("");
          setEmail("");
          // setCurrentUser(token)
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Send Info about new Starvana deals!" />
        </Form.Group>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
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
  );
};

export default Register;
