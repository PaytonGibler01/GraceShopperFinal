import React from "react";
import ReactDOM from "react-dom";
import { getUser } from "../auth";
import "./Header.css"

const Header = ({isLoggedIn, setIsLoggedIn}) =>{
  return (
    
      <header className="header">
        <img className='logo' src="https://res.cloudinary.com/dlncppfdr/image/upload/v1638633097/starvana-logo_tbjpmd.png"/>
      </header>
    
  );
  }

export default Header;