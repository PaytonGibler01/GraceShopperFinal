import React from "react";
import { getUser } from "../auth";
import { Link } from "react-router-dom";

const NavBar = ({isLoggedIn, setIsLoggedIn}) =>{
    const myUser = getUser()
    console.log(isLoggedIn)

    return(
    <div className="nav-links">
      <Link className="navbar-link" to="/____">
        ____
      </Link>
    </div>)}

export default NavBar;