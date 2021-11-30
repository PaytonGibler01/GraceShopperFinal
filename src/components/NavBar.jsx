import React from "react";
import { getUser } from "../auth";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap'
import "./NavBar.css"

const NavBar = ({isLoggedIn, setIsLoggedIn}) =>{
    const myUser = getUser()
    const history = useHistory()
    return (
      <>
      <br></br>
      <Navbar variant="dark" className="navbar">
        <Container>
        {/* <Navbar.Brand type="submit"
          onClick={()=>{
            history.push("/home")
          }}>Home</Navbar.Brand> */}
        <Nav className="me-auto">
          <Nav.Link 
            type="submit"
            onClick={()=>{
              history.push("/Home")
            }}
            >Home</Nav.Link>
  
          <Nav.Link 
            type="submit"
            onClick={()=>{
              history.push("/products")
            }}
            >Products</Nav.Link>
  
          <Nav.Link
            type="submit"
            onClick={()=>{
              history.push("/my-cart")
            }}
            >My Cart</Nav.Link>
  
          <Nav.Link
            type="submit"
            onClick={()=>{
              history.push("/profile")
            }}
            >Profile</Nav.Link>
        </Nav>

        <align-right>
        <Nav className="me-auto">
           { isLoggedIn ? (
              <Nav.Link href="login" onClick = {()=>{
                 localStorage.clear()
                 setIsLoggedIn(false)
              }}
              >Logout</Nav.Link>
           ):(null)}
  
           { ! isLoggedIn ? (
              <>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="register">Register</Nav.Link>
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