import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { loginUser } from "../api";
import { storeToken, storeUser } from "../auth";

const Login = ({ setIsLoading, setLoggedIn, username, setUsername }) => {
  const [password, setPassword] = useState("");

  return (
    <div className="auth-component-main-container">
      <form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const {
              data: { token },
            } = await loginUser(username, password);

            storeToken(token);
            storeUser(username);
            setLoggedIn(true);

            setUsername("");
            setPassword("");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <fieldset className="auth-component-input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </fieldset>

        <fieldset className="auth-component-input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </fieldset>

        <button className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
