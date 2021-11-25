import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";


import { getProducts } from '../api/products';
import {NavBar, Header, Login, Products,Register,Users, Profile, Home} from './'
const App = () => {
  const [products, setProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchAllProducts = async()=>{
    const data = await getProducts()
    setProducts(data)
    console.log(products,"useEffect getAllProducts")
  }

  useEffect(() => {
    // const data = await getProducts()
    // setProducts(data)
    // console.log(products,"useEffect getAllProducts")
    fetchAllProducts()
  }, []);

  // const getDbProducts = async () => {
  //   const {data} = await getProducts();
  //  setProducts(data);
  //   console.log(products,"useEffect getAllProducts")
  // };

  // useEffect(async () => {
  //   await getDbProducts()
  //   // isUserLoggedIn();
  // }, []);
  return (
    
    <div className="app-main-container">
 
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Switch>
                <Route path="/home">
                <Home/> 
                </Route>
                <Route path="/products">
                  <Products/>
                </Route> 
                <Route path="/login">
                  <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route path="/register">
                  <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route path="/profile">
                  <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
          </Switch>
  
    </div>
  
  );
}

export default App;
