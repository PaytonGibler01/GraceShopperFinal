import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getProducts } from "../api/products";
import {
  NavBar,
  Header,
  Login,
  Products,
  SingleProductsPage,
  Register,
  Users,
  Profile,
  Home,
} from "./";
const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchAllProducts = async()=>{
    const data = await getProducts()
    setProducts(data)
    console.log(products,"useEffect getAllProducts")
  }
  const fetchAllCartItems = async()=>{
    const data = await getCart()
    setCartItems(data)
    console.log(cartItems,"useEffect getCart")
  }
   
  useEffect(() => {
    
    fetchAllCartItems()
    fetchAllProducts()
  }, []);
 
  return (
    <div className="app-main-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products products={products} />
        </Route>
        <Route exact path="/products/:productId">
          <SingleProductsPage products={products} />
        </Route>
        <Route exact path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/register">
          <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/profile">
          <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
         <Route path="/my-cart">
          <Cart cartItems={cartItems} setCartItems={setCartItems}/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
