import React from "react";
import { getUser } from "../auth";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap'
import "./NavBar.css"

const NavBar = ({isLoggedIn, setIsLoggedIn, isAdmin}) =>{
    const myUser = getUser()
    const history = useHistory()
    return (
      <>

<br />
      <Navbar className="navbar" bg="primary" variant="dark">
        <Container>

        <Nav className="me-auto">

        <Navbar.Brand type="submit"
          onClick={()=>{
            history.push("/home")
          }}>Starvana</Navbar.Brand>
          
  
          {/* <Nav.Link 
            type="submit"
            onClick={()=>{
              history.push("/products")
            }}
            >Products</Nav.Link> */}

          <Navbar.Brand type="submit"
            onClick={()=>{
            history.push("/products")
            }}
            >Products</Navbar.Brand>
  
          {/* <Nav.Link
            type="submit"
            onClick={()=>{
              history.push("/my-cart")
            }}
            >My Cart</Nav.Link> */}

          <Navbar.Brand type="submit"
            onClick={()=>{
            history.push("/my-cart")
            }}
            >My Cart</Navbar.Brand>
  
          {/* <Nav.Link
            type="submit"
            onClick={()=>{
              history.push("/profile")
            }}
            >Profile</Nav.Link> */}

          <Navbar.Brand type="submit"
            onClick={()=>{
            history.push("/profile")
            }}
            >Profile</Navbar.Brand>

          { isAdmin ? (
            <Navbar.Brand href="admin" onClick = {()=>{
                history.push("/admin")
              }}
              >Admin</Navbar.Brand>):(null)}
              
        </Nav>

        <align-right>
        <Nav className="me-auto">
          
           { isLoggedIn ? (
              <Nav.Link href="login" onClick = {()=>{
                history.push("/login")
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