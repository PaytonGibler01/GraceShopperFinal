import React from "react";
import ReactDOM from "react-dom";
import { getUser } from "../auth";

const Header = ({isLoggedIn, setIsLoggedIn}) =>{
  // const myUser = getUser()
  // return (
  //   <header className="header">
  //     {myUser ? <h1 className="title">Welcome to Grace Shopper, {myUser}!</h1>
  //     : <h1 className="title">Welcome To Grace Shopper, Guest!</h1>}
  //   </header>
  // );
  return (
    <>
      <header>
        <h1>Welcome to Header Component</h1>
      </header>
    </>
  );
  }

export default Header;