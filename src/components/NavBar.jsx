import React from "react";
import { getUser } from "../auth";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap'
import "./NavBar.css"

const NavBar = ({isLoggedIn, setIsLoggedIn, isAdmin}) =>{
    const myUser = getUser()
    if (myUser){setIsLoggedIn(true)}
    const history = useHistory()
    return (
      <>

    <br />
      <Navbar className="navbar" bg="primary" variant="dark">
        <Container>

        <Nav className="me-auto">

        <Nav.Link type="submit"
          onClick={()=>{
            history.push("/home")
          }}>Starvana</Nav.Link>
          
  
          <Nav.Link type="submit"
            onClick={()=>{
            history.push("/products")
            }}
            >Products</Nav.Link>
  
          <Nav.Link type="submit" href="my-cart"
            onClick={()=>{
            history.push("/my-cart")
            }}
            >My Cart</Nav.Link>

          <Nav.Link type="submit"
            onClick={()=>{
            history.push("/profile")
            }}
            >Profile</Nav.Link>

          { isLoggedIn && isAdmin ? (
            <Nav.Link type="submit"
              onClick={()=>{
              history.push("/admin")
              }}
              >Admin</Nav.Link>):(null)}
              
        </Nav>

        <align-right>
        <Nav className="me-auto">
          
           { isLoggedIn ? (
              <Nav.Link className="logout" href="login" onClick = {()=>{
                history.push("/login")
                  localStorage.clear()
                 setIsLoggedIn(false)
              }}
              >Logout</Nav.Link>
           ):(null)}
            
           { ! isLoggedIn ? (
              <>
              <Nav.Link className="logout" href="login">Login</Nav.Link>
              <Nav.Link className="logout" href="register">Register</Nav.Link>
              </>
           ):(null)}
  
        </Nav>
        </align-right>

        </Container>
      </Navbar>
      </>
    );
  };

export default NavBar;