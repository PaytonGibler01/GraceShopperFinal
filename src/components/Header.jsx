import React from "react";
import ReactDOM from "react-dom";
import { getUser } from "../auth";
import "./Header.css"

const Header = ({isLoggedIn, setIsLoggedIn}) =>{
  // const myUser = getUser()
  // return (
  //   <header className="header">
  //     {myUser ? <h1 className="title">Welcome to Grace Shopper, {myUser}!</h1>
  //     : <h1 className="title">Welcome To Grace Shopper, Guest!</h1>}
  //   </header>
  // );
  return (
    
      <header className="header">
        <img className='logo' src="https://res.cloudinary.com/dlncppfdr/image/upload/v1638633097/starvana-logo_tbjpmd.png"/>
      </header>
    
  );
  }

export default Header;